require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const Person = require("./models/Person");
const errorHandler = require("./middlewares/handleErrors");
const unknownEndpoint = require("./middlewares/unknownEndpoint");
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("build"));
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

app.get("/api/persons", async (req, res) => {
  const persons = await Person.find({});
  return res.json(persons.map(p => p.toJSON()));
});

app.get("/info", async (req, res) => {
  const persons = await Person.find({});
  res.send(
    `Phonebook has info for ${persons.length} people <br/> ${new Date()}`
  );
});

app.get("/api/persons/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const person = await Person.findById(id);
    return person
      ? res.json(person.toJSON())
      : res
          .status(404)
          .send({ error: "Can't find the person" })
          .end();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

app.post("/api/persons", async (req, res) => {
  const { name, number } = req.body;
  if (!name || !number)
    return res
      .status(422)
      .send({ error: "You have to provide name and number" });

  try {
    const existingPerson = await Person.findOne({ name: name });
    if (existingPerson)
      return res.status(422).send({ error: "name must be unique" });

    const person = new Person({
      name,
      number
    });

    const newPerson = await person.save();
    res.json(newPerson.toJSON());
  } catch (error) {
    next(error);
  }
});

app.delete("/api/persons/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    await Person.findByIdAndRemove(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.put("/api/persons/:id", async (req, res, next) => {
  const { name, number } = req.body;
  const id = req.params.id;

  const person = { name, number };
  try {
    const updatedPerson = await Person.findByIdAndUpdate(id, person, {
      new: true
    });
    res.json(updatedPerson.toJSON());
  } catch (error) {
    next(error);
  }
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
