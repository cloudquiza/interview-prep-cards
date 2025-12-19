const LLM_PROMPT = `Create and attach a downloadable CSV file named interview_deck.csv.

The CSV must have EXACTLY these headers (do not change them, do not add columns):
question,answer

Generate 20 interview questions and concise answers for a QA Analyst interview.
- Answers should be 2–4 sentences, practical, and in first person.
- Avoid overly long paragraphs.

File requirements:
- The first line must be: question,answer
- Quote EVERY field with double quotes
- If a field contains a double quote, escape it by doubling it ("")
- The output must be a valid CSV file that I can download directly

Do NOT include markdown, explanations, or any text outside the file.`;

// DOM
const copyPromptBtn = document.getElementById("copyPromptBtn");
const fileInput = document.getElementById("fileInput");
const statusEl = document.getElementById("status");

const cardEl = document.getElementById("card");
const qText = document.getElementById("qText");
const aText = document.getElementById("aText");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const counterEl = document.getElementById("counter");

// State
let cards = []; // { question, answer }
let i = 0;

// Clipboard
async function copy(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    return true;
  }
}

// CSV parsing (quoted commas + escaped quotes)
function parseCSV(text) {
  const rows = [];
  let row = [];
  let cur = "";
  let inQuotes = false;

  for (let idx = 0; idx < text.length; idx++) {
    const c = text[idx];
    const next = text[idx + 1];

    if (c === '"' && inQuotes && next === '"') {
      cur += '"';
      idx++;
      continue;
    }
    if (c === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (c === "," && !inQuotes) {
      row.push(cur);
      cur = "";
      continue;
    }

    if ((c === "\n" || c === "\r") && !inQuotes) {
      if (c === "\r" && next === "\n") idx++;
      row.push(cur);
      if (row.some((v) => v.trim() !== "")) rows.push(row);
      row = [];
      cur = "";
      continue;
    }

    cur += c;
  }

  row.push(cur);
  if (row.some((v) => v.trim() !== "")) rows.push(row);
  return rows;
}

function toCards(table) {
  if (!table || table.length < 2)
    throw new Error("CSV must include headers + at least one row.");

  const headers = table[0].map((h) => (h || "").trim().toLowerCase());
  const qIdx = headers.indexOf("question");
  const aIdx = headers.indexOf("answer");

  if (qIdx === -1 || aIdx === -1) {
    throw new Error("Missing headers. First row must be: question,answer");
  }

  const out = [];
  for (let r = 1; r < table.length; r++) {
    const row = table[r] || [];
    const question = (row[qIdx] || "").trim();
    const answer = (row[aIdx] || "").trim();
    if (!question || !answer) continue;
    out.push({ question, answer });
  }

  if (!out.length)
    throw new Error("No valid rows found. Each row needs question + answer.");
  return out;
}

function setStatus(msg) {
  statusEl.innerHTML = msg;
}

function render() {
  if (!cards.length) {
    qText.textContent = "Upload a CSV to start.";
    aText.textContent = "";
    counterEl.textContent = "—";
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    cardEl.classList.remove("flipped");
    return;
  }

  qText.textContent = cards[i].question;
  aText.textContent = cards[i].answer;
  counterEl.textContent = `${i + 1} / ${cards.length}`;
  prevBtn.disabled = cards.length <= 1;
  nextBtn.disabled = cards.length <= 1;
}

function flip() {
  if (!cards.length) return;
  cardEl.classList.toggle("flipped");
}

function next() {
  if (!cards.length) return;
  i = (i + 1) % cards.length;
  cardEl.classList.remove("flipped");
  render();
}

function prev() {
  if (!cards.length) return;
  i = (i - 1 + cards.length) % cards.length;
  cardEl.classList.remove("flipped");
  render();
}

// Events
copyPromptBtn.addEventListener("click", async () => {
  await copy(LLM_PROMPT);
  const old = copyPromptBtn.textContent;
  copyPromptBtn.textContent = "Copied!";
  setTimeout(() => (copyPromptBtn.textContent = old), 800);
});

fileInput.addEventListener("change", async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  if (!file.name.toLowerCase().endsWith(".csv")) {
    setStatus(
      "Please upload a <code>.csv</code> file with headers: <code>question,answer</code>."
    );
    fileInput.value = "";
    return;
  }

  try {
    const text = await file.text();
    cards = toCards(parseCSV(text));
    i = 0;
    render();
    setStatus(
      `Loaded <b>${cards.length}</b> cards • headers required: <code>question,answer</code>`
    );
  } catch (err) {
    cards = [];
    render();
    setStatus(`Error: ${err.message}`);
  } finally {
    fileInput.value = "";
  }
});

cardEl.addEventListener("click", flip);
cardEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    flip();
  }
});

nextBtn.addEventListener("click", next);
prevBtn.addEventListener("click", prev);

document.addEventListener("keydown", (e) => {
  if (!cards.length) return;
  if (e.key === "ArrowRight") next();
  if (e.key === "ArrowLeft") prev();
});

// Init
render();
