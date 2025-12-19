# Interview Prep Cards

A minimal, no-friction interview practice site.

Generate your own interview questions using an LLM, upload them as a CSV, and practice by flipping cards.  
Everything runs locally in the browser. No accounts. No backend.

---

## Live site

https://cloudquiza.github.io/interview-prep-cards/

---

## How to use

1. Click **Copy LLM Prompt**
2. Open ChatGPT, Claude, Gemini, or another LLM and paste the prompt
3. Download the generated `interview_deck.csv`
4. Upload the CSV here and practice by flipping cards

---

## CSV schema (required)

Your CSV must include **exactly** these headers (case-insensitive):

```csv
question,answer
```

Each row represents one card:

- **question** → front of the card
- **answer** → back of the card

---

## LLM prompt

You may edit the role or number of questions, but **do not change the CSV headers or structure**.

```
Create and attach a downloadable CSV file named interview_deck.csv.

The CSV must have EXACTLY these headers (do not change them, do not add columns):
question,answer

Goal:
Generate highly targeted interview practice questions and concise answers for the role specified below.

ROLE (REQUIRED — edit this):
[PASTE ROLE TITLE HERE]

Optional (for better targeting):
If a job posting is provided below, tailor the questions and answers to the responsibilities, tools, and keywords in that posting.
If no job posting is provided, use general interview topics relevant to the role.

JOB POSTING (OPTIONAL — paste below, or leave blank):
<<<
PASTE JOB POSTING HERE (optional)
>>>

Requirements:
- Generate 20 interview questions and concise answers.
- Answers should be 2–4 sentences, practical, and in first person.
- Avoid overly long paragraphs.
- Mix question types:
  - Behavioral (STAR-style)
  - Role-specific technical or domain fundamentals
  - Collaboration and communication
  - Tools, processes, or workflows relevant to the role (tailor to the job posting if provided)
- Keep the answers realistic: confident, not overly “expert,” and focused on impact.

File requirements:
- The first line must be: question,answer
- Quote EVERY field with double quotes.
- If a field contains a double quote, escape it by doubling it ("").
- Output MUST be valid CSV ONLY (no markdown, no code fences, no tables, no extra commentary).
- Do NOT include any text outside the CSV.
```

---

## Features

- Copy-paste LLM prompt for CSV generation
- Quick links to ChatGPT, Claude, and Gemini
- CSV upload (client-side only)
- Interactive flip cards (click or Enter)
- Keyboard navigation (← / →)
- Works directly on GitHub Pages

---

## Privacy

- All CSV parsing happens in your browser
- No data is uploaded or stored on a server
- Reloading the page requires re-uploading the CSV

---

## Local run (optional)

You can open `index.html` directly, or run a simple local server:

```bash
python3 -m http.server 5173
```

Then visit:
[http://localhost:5173](http://localhost:5173)

---

## Deploy (GitHub Pages)

1. Push this repository to GitHub
2. Go to **Settings → Pages**
3. Source: **Deploy from a branch**
4. Branch: `main`
5. Folder: `/ (root)`
6. Save

Your site will be live at:

```
https://YOUR_USERNAME.github.io/interview-prep-cards/
```

---

## License

MIT — free to use, fork, and adapt.

---

## Author

Built as a minimal portfolio project for interview preparation and practice.
