const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.get("/data", (req, res) => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/data.json")));
  res.json(data);
});

app.post("/data", (req, res) => {
  fs.writeFileSync(path.join(__dirname, "../data/data.json"), JSON.stringify(req.body, null, 2));
  res.json({ status: "ok" });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
