// Leonida Trophy Guide: a checklist over all 55 official GTA VI trophies.
// Progress is stored only in this browser (localStorage); export and
// import move it as JSON. Spoiler mode hides story trophies until earned.
const KEY = "leonida-trophy-guide-v1";
const list = document.getElementById("list");
const search = document.getElementById("search");
const gradeSel = document.getElementById("grade");
const kindSel = document.getElementById("kind");
const missableBox = document.getElementById("missable");
const unearnedBox = document.getElementById("unearned");
const spoilerBox = document.getElementById("spoilers");
let earned = new Set(JSON.parse(localStorage.getItem(KEY) ?? "[]"));
const doc = await (await fetch("data/trophies.json")).json();

function save() {
  localStorage.setItem(KEY, JSON.stringify([...earned]));
}

function hidden(t) {
  return spoilerBox.checked && t.secret && !earned.has(t.name);
}

function render() {
  const q = search.value.trim().toLowerCase();
  list.replaceChildren();
  let shown = 0;
  for (const t of doc.trophies) {
    if (gradeSel.value !== "all" && t.grade !== gradeSel.value) continue;
    if (kindSel.value !== "all" && t.category !== kindSel.value) continue;
    if (missableBox.checked && !t.missable) continue;
    if (unearnedBox.checked && earned.has(t.name)) continue;
    if (q && !(t.name + " " + t.guide + " " + t.description).toLowerCase().includes(q)) continue;
    shown++;
    const card = document.createElement("article");
    card.className = "card" + (earned.has(t.name) ? " earned" : "");
    const top = document.createElement("div");
    top.className = "top";
    const h = document.createElement("h3");
    h.textContent = hidden(t) ? "Story trophy — hidden until earned" : t.name;
    const badge = document.createElement("span");
    badge.className = "badge " + t.grade;
    badge.textContent = t.grade;
    top.append(h, badge);
    if (t.missable) {
      const m = document.createElement("span");
      m.className = "miss";
      m.textContent = "Missable";
      top.append(m);
    }
    const desc = document.createElement("p");
    desc.className = "desc";
    desc.textContent = hidden(t) ? "Complete the story moment to reveal it." : t.description;
    const guide = document.createElement("p");
    guide.className = "guide";
    guide.textContent = hidden(t) ? "" : t.guide;
    const src = document.createElement("p");
    src.className = "source";
    src.textContent = "Source: " + t.source;
    const tick = document.createElement("label");
    tick.className = "tick";
    const box = document.createElement("input");
    box.type = "checkbox";
    box.checked = earned.has(t.name);
    box.addEventListener("change", () => {
      if (box.checked) earned.add(t.name);
      else earned.delete(t.name);
      save();
      render();
    });
    tick.append(box, document.createTextNode(earned.has(t.name) ? "Earned" : "Mark as earned"));
    card.append(top, desc, guide, src, tick);
    list.append(card);
  }
  document.getElementById("count").textContent = `Showing ${shown} of ${doc.trophies.length} trophies`;
  const pct = Math.round((earned.size / doc.trophies.length) * 100);
  document.getElementById("bar").style.width = pct + "%";
  document.getElementById("progress").textContent =
    `${earned.size} of ${doc.trophies.length} earned · ${pct}% · ${54 - earned.size + (earned.has("Vice Got a Price!") ? 1 : 0)} to the platinum`;
}

document.getElementById("export").addEventListener("click", () => {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify([...earned])], { type: "application/json" }));
  a.download = "leonida-trophy-progress.json";
  a.click();
});
document.getElementById("import").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  earned = new Set(JSON.parse(await file.text()));
  save();
  render();
});
for (const el of [search, gradeSel, kindSel, missableBox, unearnedBox, spoilerBox]) {
  el.addEventListener("input", render);
  el.addEventListener("change", render);
}
render();
