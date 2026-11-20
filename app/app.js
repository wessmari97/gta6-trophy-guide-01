// Leonida Trophy Guide: a checklist over all 55 official GTA VI trophies.
// Progress lives only in this browser (localStorage) and can be exported
// or imported as JSON. Spoiler mode hides story trophies until earned.
const STORAGE_KEY = "leonida-trophy-guide-v1";
const TOTAL = 55;

const listEl = document.getElementById("list");
const searchEl = document.getElementById("search");
const gradeEl = document.getElementById("grade");
const kindEl = document.getElementById("kind");
const missableEl = document.getElementById("missable");
const unearnedEl = document.getElementById("unearned");
const spoilerEl = document.getElementById("spoiler");
const countLine = document.getElementById("count-line");
const earnedCount = document.getElementById("earned-count");
const progressFill = document.getElementById("progress-fill");
const progressNote = document.getElementById("progress-note");

let earned = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]"));
const data = await (await fetch("data/trophies.json")).json();

function store() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...earned]));
}

function isHidden(trophy) {
  return spoilerEl.checked && trophy.secret && !earned.has(trophy.name);
}

function passesFilters(trophy) {
  if (gradeEl.value !== "all" && trophy.grade !== gradeEl.value) return false;
  if (kindEl.value !== "all" && trophy.category !== kindEl.value) return false;
  if (missableEl.checked && !trophy.missable) return false;
  if (unearnedEl.checked && earned.has(trophy.name)) return false;
  const query = searchEl.value.trim().toLowerCase();
  if (query) {
    const haystack = (trophy.name + " " + trophy.description + " " + trophy.guide).toLowerCase();
    if (!haystack.includes(query)) return false;
  }
  return true;
}

function makeCard(trophy) {
  const hidden = isHidden(trophy);
  const card = document.createElement("article");
  card.className = "card" + (earned.has(trophy.name) ? " earned" : "");

  const head = document.createElement("div");
  head.className = "card-head";
  const title = document.createElement("h3");
  title.textContent = hidden ? "Story trophy — hidden until earned" : trophy.name;
  const tag = document.createElement("span");
  tag.className = "grade-tag " + trophy.grade;
  tag.textContent = trophy.grade;
  head.append(title, tag);
  if (trophy.missable) {
    const flag = document.createElement("span");
    flag.className = "miss-tag";
    flag.textContent = "Missable";
    head.append(flag);
  }

  const desc = document.createElement("p");
  desc.className = "desc";
  desc.textContent = hidden ? "Play the story to reveal it." : trophy.description;

  const guide = document.createElement("p");
  guide.className = "guide";
  guide.textContent = hidden ? "" : trophy.guide;

  const source = document.createElement("p");
  source.className = "source";
  source.textContent = "Source: " + trophy.source;

  const toggle = document.createElement("label");
  toggle.className = "earned-toggle";
  const box = document.createElement("input");
  box.type = "checkbox";
  box.checked = earned.has(trophy.name);
  box.addEventListener("change", () => {
    if (box.checked) earned.add(trophy.name);
    else earned.delete(trophy.name);
    store();
    render();
  });
  toggle.append(box, document.createTextNode(earned.has(trophy.name) ? "Earned" : "Mark as earned"));

  card.append(head, desc, guide, source, toggle);
  return card;
}

function renderNextUp() {
  const list = document.getElementById("nextup-list");
  list.replaceChildren();
  const upcoming = data.trophies
    .filter((t) => t.category === "story" && !earned.has(t.name))
    .slice(0, 5);
  if (upcoming.length === 0) {
    const item = document.createElement("li");
    item.textContent = "Story complete — every story trophy earned.";
    list.append(item);
    return;
  }
  for (const trophy of upcoming) {
    const item = document.createElement("li");
    const name = document.createElement("strong");
    name.textContent = isHidden(trophy) ? "Story trophy — hidden until earned" : trophy.name;
    item.append(name);
    if (!isHidden(trophy)) item.append(document.createTextNode(" — " + trophy.description));
    list.append(item);
  }
}

function render() {
  listEl.replaceChildren();
  let shown = 0;
  for (const trophy of data.trophies) {
    if (!passesFilters(trophy)) continue;
    shown++;
    listEl.append(makeCard(trophy));
  }
  countLine.textContent = `Showing ${shown} of ${data.trophies.length} trophies`;
  renderNextUp();
  const pct = Math.round((earned.size / TOTAL) * 100);
  earnedCount.textContent = earned.size;
  progressFill.style.width = pct + "%";
  const remaining = TOTAL - earned.size;
  progressNote.textContent = earned.size === TOTAL
    ? "Platinum earned — Leonida Legend!"
    : `${remaining} to the platinum`;
}

document.getElementById("reset").addEventListener("click", () => {
  if (!confirm("Reset all progress? Every trophy you ticked off will be unticked.")) return;
  earned = new Set();
  store();
  render();
});

document.getElementById("export").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify([...earned])], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "leonida-trophy-progress.json";
  link.click();
});

document.getElementById("import").addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  earned = new Set(JSON.parse(await file.text()));
  store();
  render();
});

for (const el of [searchEl, gradeEl, kindEl, missableEl, unearnedEl, spoilerEl]) {
  el.addEventListener("input", render);
  el.addEventListener("change", render);
}

render();
