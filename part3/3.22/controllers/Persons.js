const personsRouter = require("express").Router();
const Person = require("../models/Person");

personsRouter.get("/", async (req, res) => {
  const persons = await Person.find({});
  return res.json(persons.map(p => p.toJSON()));
});


personsRouter.get("/:id", async (req, res, next) => {
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

personsRouter.post("/", async (req, res, next) => {
  const { name, number } = req.body;

  try {
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

personsRouter.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    await Person.findByIdAndRemove(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

personsRouter.put("/:id", async (req, res, next) => {
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

module.exports = personsRouter;