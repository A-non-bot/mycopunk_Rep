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
    const nameSpan = document.createElement("span");
    nameSpan.textContent = loadout.name;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("loadout-btn");
    editBtn.addEventListener("click", () => {
      console.log("Edit loadout:", loadout.id);
      // TODO: add functionality
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("loadout-btn");
    deleteBtn.addEventListener("click", async () => {
      await deleteLoadout(loadout.id);
    });

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-group");
    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(deleteBtn);

    li.appendChild(nameSpan);
    li.appendChild(buttonContainer);

    ul.appendChild(li);
  });
}

async function createLoadout() {
  const input = document.getElementById("loadoutInput");
  const name = input.value.trim();

  if (!name) return;

  const data = await getData();

  // generate new ID
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

async function deleteLoadout(loadoutId) {
  const data = await getData();
  data.loadouts = data.loadouts.filter((l) => l.id !== loadoutId);

  await saveData(data);
  await renderLoadouts();
}

renderLoadouts();
