const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
let db = require("./db.json");

app.use(bodyParser.json());

morgan.token("body", (req, res) => JSON.stringify(req.body));

const loggerFormat =
  ":method :url :status :res[content-length] - :response-time ms - :body";

app.use(
  morgan(loggerFormat, {
    skip: function(req, res) {
      return req.method !== "POST";
    }
  })
);

app.use(
  morgan("combined", {
    skip: function(req, res) {
      return req.method === "POST";
    }
  })
);

app.get("/", (req, res) => res.send("Hi there"));
app.get("/api/persons", (req, res) => res.send(db));
app.get("/info", (req, res) =>
  res.send(`Phonebook has info for ${db.length} people <br/> ${new Date()}`)
);

app.get("/api/person/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const person = await db.find(p => p.id === id);
    person
      ? res.json(person)
      : res
          .status(404)
          .send({ error: "Can't find the person" })
          .end();
  } catch (error) {
    console.log(error);
  }
});

const generateId = () => {
  const maxId = db.length > 0 ? Math.max(...db.map(p => p.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons", async (req, res) => {
  const { name, number } = req.body;
  if (!name || !number)
    return res
      .status(422)
      .send({ error: "You have to provide name and number" });

  try {
    const existingPerson = await db.find(
      p => p.name.toLowerCase() === name.toLowerCase()
    );
    if (existingPerson)
      return res.status(422).send({ error: "name must be unique" });

    const person = {
      name: name,
      number: number,
      id: generateId()
    };

    db = [...db, person];
    res.send(db);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/person/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    await db.filter(p => p.id !== id);
    res.status(402).end();
  } catch (error) {
    res.send({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
