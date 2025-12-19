# Interview Prep with AI

A minimal, no-friction interview practice site powered by AI prompts.

Generate your own interview questions using an LLM, upload them as a CSV, and practice immediately with interactive flip cards. Everything runs locally in your browser — no accounts, no backend.

---

## Live site

https://cloudquiza.github.io/interview-prep-cards/

---

## How it works

1. **Copy the prompt** from the site and paste it into your preferred LLM (ChatGPT or Gemini work especially well).
2. **Customize the prompt** by updating the role name, adjusting the number of questions, and optionally pasting a full job posting for more targeted results.
3. Download the generated **`interview_deck.csv`**.
4. **Upload the CSV** and start practicing immediately:
   - Click the card to flip between question and answer
   - Use **Prev / Next** to move through the deck
5. Practice confidently and prepare to ace your next interview.

---

## CSV schema (required)

Your CSV must include **exactly** these headers (case-insensitive):

```csv
question,answer
```

Each row represents one card:

- **question** → front of the card
- **answer** → back of the card

The provided LLM prompt handles this formatting for you.

---

## LLM prompt

You may edit the role, number of questions, and job posting, but **do not change the CSV headers or structure**.

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
  - Behavioral
  - Role-specific technical or domain fundamentals
  - Collaboration and communication
  - Tools, processes, or workflows relevant to the role
- Keep answers realistic and focused on impact.

File requirements:
- The first line must be: question,answer
- Quote EVERY field with double quotes.
- If a field contains a double quote, escape it by doubling it ("")
- Output MUST be valid CSV ONLY.
- Do NOT include markdown, explanations, or any text outside the CSV.
```

---

## Features

- AI-driven prompt for custom interview decks
- Role-agnostic (works for QA, Risk, Fraud, GRC, Support, PM, Engineering, and more)
- Optional job-posting targeting
- Instant practice after CSV upload
- Click-to-flip cards
- Prev / Next navigation
- Keyboard-friendly interaction
- Runs directly on GitHub Pages

---

## Privacy & storage

- All CSV parsing and card interaction happens entirely in your browser

- No uploaded content is sent to a backend or stored on a server

- CSV files are not saved permanently

- Refreshing the page resets the deck

- Basic, privacy-friendly analytics (Google Analytics 4) are used to understand general site usage only, such as page views and interaction events (e.g. button clicks and outbound links).
  No personally identifiable information or CSV content is collected.

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

Built as a minimal portfolio project for interview preparation.
