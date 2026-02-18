async function renderLoadout(loadoutId) {
  const res = await fetch("http://localhost:3000/data");
  const data = await res.json();

  const loadout = data.loadouts.find((l) => l.id === loadoutId);
  const ul = document.getElementById("loadoutList");
  ul.innerHTML = "";

  if (loadout) {
    loadout.items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });
  }
}

async function addItem() {
  const input = document.getElementById("loadoutInput");
  const value = input.value.trim();

  if (!value) return;

  try {
    const res = await fetch("http://localhost:3000/data");
    const data = await res.json();

    let loadout = data.loadouts.find((l) => l.id === 1);
    if (!loadout) {
      loadout = { id: 1, items: [] };
      data.loadouts.push(loadout);
    }

    loadout.items.push(value);

    await fetch("http://localhost:3000/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const li = document.createElement("li");
    li.textContent = value;
    document.getElementById("loadoutList").appendChild(li);

    input.value = "";

    await renderLoadout(1);
  } catch (err) {
    console.error("Error adding item:", err);
  }
}
