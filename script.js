function addItem() {
        const input = document.getElementById("loadoutInput");
        const value = input.value.trim();
        console.log(value);
        if (!value) return;

        const li = document.createElement("li");
        li.textContent = value
        document.getElementById("loadoutList").appendChild(li);
        input.value = "";
}

function addItemChar() {
        const input = document.getElementById("characterSelect");
        const value = input.value.trim();
        console.log(value);
        if (!value) return;
}