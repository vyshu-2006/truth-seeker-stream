# Truth Seeker Stream

**AI-powered misinformation detection web app** — paste any claim and get an instant credibility verdict powered by Claude.

## 🔗 Live Demo

**[truth-seeker-stream.lovable.app](https://truth-seeker-stream.lovable.app)**

> **Quick test:** Try `"Drinking carrot juice prevents COVID-19"` → Expected: `Label: False | Confidence: 0.92`

---

## What It Does

Truth Seeker lets users submit a text claim or social media snippet and receive a credibility classification — **True**, **False**, or **Unverified** — along with a confidence score and highlighted evidence sentences with source URLs.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript (Vite) |
| UI Components | shadcn/ui + Tailwind CSS |
| Backend/DB | Supabase |
| AI Inference | Claude API (via Anthropic) |
| Build tool | Bun |
| Hosting | Lovable |

---

## Features

- **Claim ingestion** — single sentence or short paragraph input
- **AI-powered verdict** — classifies claims as True / False / Unverified with confidence score
- **Evidence highlighting** — surfaces sentences that support or contradict the claim
- **Source attribution** — links to relevant sources where available
- **Clean, responsive UI** — built with shadcn/ui components

---

## Project Structure
truth-seeker-stream/
├── public/          # Static assets
├── src/             # React app (components, pages, hooks)
├── supabase/        # Supabase config & edge functions
├── .env             # API keys (not committed)
└── README.md


---

## Getting Started

```bash
# Install dependencies
bun install

# Set up environment variables
cp .env.example .env
# Add your Supabase URL, anon key, and Anthropic API key

# Start dev server
bun dev
```

---

## Screenshots
<img width="796" height="770" alt="login" src="https://github.com/user-attachments/assets/b831d521-e1c7-4a56-a404-4461e886678d" />
<img width="1841" height="868" alt="dashboard" src="https://github.com/user-attachments/assets/fb54b937-adc1-4670-9a79-425eb90b5064" />
<img width="1129" height="810" alt="output" src="https://github.com/user-attachments/assets/5ef62305-07ec-43e3-a64b-a5a7f1461530" />
---

## Notes

This project was scaffolded and built using [Lovable](https://lovable.dev). The AI verdict logic runs through Supabase Edge Functions calling the Anthropic Claude API — no custom ML training involved.


