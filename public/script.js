const API_URL = "http://localhost:3000/data";

async function getData() {
  const res = await fetch(API_URL);
  return await res.json();
}

async function saveData(data) {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data, null, 2),
  });
}

async function renderLoadouts() {
  const data = await getData();

  const ul = document.getElementById("loadoutList");
  ul.innerHTML = "";

  data.loadouts.forEach((loadout) => {
    const li = document.createElement("li");
    li.textContent = loadout.name;

    // store the id inside the element (useful later)
    li.dataset.id = loadout.id;

    ul.appendChild(li);
  });
}

async function createLoadout() {
  const input = document.getElementById("loadoutInput");
  const name = input.value.trim();

  if (!name) return;

  const data = await getData();

  // Generate a new unique ID
  const newId = data.loadouts.length > 0 ? Math.max(...data.loadouts.map((l) => l.id)) + 1 : 1;

  const newLoadout = {
    id: newId,
    name: name,
    items: [],
  };

  data.loadouts.push(newLoadout);

  await saveData(data);

  input.value = "";

  await renderLoadouts();
}

// Run when page loads
renderLoadouts();
