import React, { useState } from "react";
import AddNewData from "./AddNewData";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFiliter, setNewFilter] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    if (
      persons.some(
        person =>
          person.name
            .replace(/ /g, "")
            .toLowerCase()
            .trim() ===
          newName
            .replace(/ /g, "")
            .toLowerCase()
            .trim()
      )
    ) {
      return window.alert(`${newName} already exists, update number?`);
    }

    const phoneno = /^\d{10}$/;
    if (!newNumber.match(phoneno)) {
      return window.alert("Please type in validated phone number");
    }

    const newNameObj = {
      name: newName,
      number: newNumber
    };
    setPersons([...persons, newNameObj]);
    setNewName("");
    setNewNumber("");
  };

  const handleFilteredChange = e => {
    setNewFilter(e.target.value);
  };

  const filteredPersons = persons.filter(person => {
    return person.name.toLowerCase().includes(newFiliter.toLowerCase());
  });

  return (
    <div onSubmit={handleSubmit}>
      <h2>Phone book</h2>
      <form>
        filter shown with
        <input type="text" value={newFiliter} onChange={handleFilteredChange} />
      </form>
      <h2>Add a new</h2>
      <AddNewData
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
