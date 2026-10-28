import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import rateLimit from "express-rate-limit";
import OpenAI from "openai";

const app = express();
const port = Number(process.env.PORT) || 3000;
const root = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(root, "public");
app.disable("x-powered-by");
app.use(express.json({ limit: "20kb" }));
app.use("/api/chat", rateLimit({ windowMs: 60_000, limit: 20, standardHeaders: true, legacyHeaders: false }));
app.use(express.static(publicDir));
app.get("/api/health", (_req, res) => res.json({ ok: true, service: "SAGE", aiConfigured: Boolean(process.env.OPENAI_API_KEY) }));
app.post("/api/chat", async (req, res) => {
  const message = req.body?.message;
  if (typeof message !== "string" || !message.trim()) return res.status(400).json({ error: "Please enter a message." });
  if (message.length > 2000) return res.status(400).json({ error: "Please keep messages under 2,000 characters." });
  if (!process.env.OPENAI_API_KEY) return res.status(503).json({ error: "SAGE AI is not configured yet. Add your private API key to .env." });
  const history = Array.isArray(req.body?.history) ? req.body.history.filter(x => x && ["user", "assistant"].includes(x.role) && typeof x.content === "string").slice(-8).map(x => ({ role: x.role, content: x.content.slice(0, 1500) })) : [];
  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const result = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.5",
      instructions: `You are SAGE (Seek, Aspire, Grow, Explore), a warm, conversational career guidance assistant for students. Be specific, curious, empathetic, and non-repetitive. Ask useful follow-up questions naturally. Help explore careers, subjects, courses, skills, universities and study pathways. Law is broader than becoming a lawyer; explore options and ask what interests the student. Do not invent salary, fee, admissions, university or placement facts; label estimates and encourage checking official sources. For distress, prioritize empathy over career advice. If the user mentions suicide or immediate danger, take it seriously, ask whether they are in immediate danger, and encourage them to tell a trusted adult nearby and contact local emergency support. Do not shame or dismiss them. Never claim to have accessed data that has not been supplied.`,
      input: [...history, { role: "user", content: message.trim() }],
      max_output_tokens: 700
    });
    return res.json({ reply: result.output_text?.trim() || "I'm here with you. Could you tell me a little more?" });
  } catch (error) {
    console.error("SAGE chat request failed:", error.message);
    return res.status(500).json({ error: "Sorry, SAGE couldn't respond just now. Please try again." });
  }
});
app.get("*path", (_req, res) => res.sendFile(path.join(publicDir, "index.html")));
app.listen(port, () => console.log(`SAGE is running at http://localhost:${port}`));
