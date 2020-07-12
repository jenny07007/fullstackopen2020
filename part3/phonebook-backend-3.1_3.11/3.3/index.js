const express = require("express");
const app = express();
const db = require("./db.json");

app.get("/", (req, res) => res.send("Hi there"));
app.get("/api/persons", (req, res) => res.send(db));
app.get("/info", (req, res) =>
  res.send(`Phonebook has info for ${db.length} people <br/> ${new Date()}`)
);
app.get("/api/person/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = db.find(p => p.id === id);
  return person
    ? res.json(person)
    : res
        .status(404)
        .send({ error: "Can't find the person" })
        .end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
