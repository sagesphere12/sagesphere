# SAGE — Seek · Aspire · Grow · Explore

This project contains the SAGE static website and optional AI chatbot backend.

## What's included
- Home, career explorer, career details, university explorer, quiz, compare, and blog pages
- Shared `data.js` career/university data
- `style.css` and SAGE logo
- Express server with `/api/chat` endpoint
- Root-level website copies and a matching `public/` folder for serving

## Run locally
1. Install Node.js (LTS).
2. Open a terminal in this folder.
3. Run `npm install`.
4. Copy `.env.example` to `.env`.
5. Add your own valid API key to `OPENAI_API_KEY` in `.env` (keep it private; never commit `.env`).
6. Run `npm run dev`.
7. Open `http://localhost:3000`.

The AI chat requires a valid API key and a model available to your account. If the server/key is unavailable, the chatbot now says so rather than silently pretending a generic canned response is AI.

## Data accuracy
Career descriptions are guidance, not a guarantee of job eligibility or salary. Fee and salary figures are estimates and vary by country, region, institution, experience, and year. University course offerings and admission rules change. Where a location is not verified in the directory, the card labels it as unverified rather than inventing a city. NLSIU is listed in Nagarbhavi, Bengaluru, Karnataka, with law and public-policy program areas.


Chatbot note: the site now falls back to its built-in conversational guide if the AI server or API key is unavailable. For full AI responses, run the server and configure OPENAI_API_KEY in a private .env file; never put the key in browser JavaScript.
