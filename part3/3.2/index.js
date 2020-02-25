const express = require("express");
const app = express();
const db = require("./db.json");

app.get("/", (req, res) => res.send("Hi there"));
app.get("/api/persons", (req, res) => res.send(db));
app.get("/info", (req, res) =>
  res.send(`Phonebook has info for ${db.length} people <br/> ${new Date()}`)
);

const PORT = 3001 || process.env.PORT;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
