import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personsService from "../services/persons";
import "../styles.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFiliter, setNewFilter] = useState("");

  useEffect(() => {
    personsService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);
  console.log("render", persons.length, "persons");

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

    personsService.create(newNameObj).then(returnedPersons => {
      setPersons([...persons, returnedPersons]);
      setNewName("");
      setNewNumber("");
    });
  };

  const filteredPersons = persons.filter(person => {
    return person.name.toLowerCase().includes(newFiliter.toLowerCase());
  });

  const handleRemove = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      return personsService
        .remove(id)
        .then(() => setPersons(persons.filter(person => person.id !== id)));
    }
  };

  return (
    <div onSubmit={handleSubmit} className="App">
      <h2>Phone book</h2>
      <Filter newFiliter={newFiliter} setNewFilter={setNewFilter} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      {!newFiliter ? (
        <div>No numbers to show. Search a name to show your contact!</div>
      ) : (
        <Persons persons={filteredPersons} handeRemove={handleRemove} />
      )}
    </div>
  );
};

export default App;
