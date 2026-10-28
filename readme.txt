# SAGE — Seek · Aspire · Grow · Explore

## Included
- Static website pages: home, careers, career details, quiz, compare, universities, and blog
- Shared stylesheet, logo, and career/university data
- Optional AI chat backend (`server.js`) that keeps the API key on the server
- `.env.example` starter file

## Run locally
1. Install Node.js 20 or newer.
2. Open this folder in a terminal.
3. Run `npm install`.
4. Copy `.env.example` to `.env`.
5. Add your own API key to `.env` and confirm the configured model is available to your account.
6. Run `npm run dev` and open `http://localhost:3000`.

Without an API key, the website pages still load; AI chat may fall back to the local response logic.
Do not share your `.env` file or publish API keys.

## Data quality note
Career profiles are exploratory guidance, not guarantees of employment, salary, admissions, or placements. Salary/fee estimates vary by location, year, institution, and experience. University program availability and campus details should be confirmed against current official catalogs before making decisions. Some university cards provide broad areas of study rather than a verified current course list.
