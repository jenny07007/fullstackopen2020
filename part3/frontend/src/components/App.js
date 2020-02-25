import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import Notification from "./Notification";
import personsService from "../services/persons";
import "../styles.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFiliter, setNewFilter] = useState("");
  const [notification, setNotification] = useState();
  const phoneno = /^\d{10}$/;

  useEffect(() => {
    personsService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);
  console.log("render", persons.length, "persons");

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

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
      const message = window.confirm(
        `${newName} already exists, do you want to update the number?`
      );
      if (message) {
        const person = persons.find(
          person => person.name.toLowerCase() === newName.toLowerCase()
        );
        return updateData(person.id);
      } else {
        return "";
      }
    }

    if (!newNumber.match(phoneno)) {
      return window.alert("Please enter a validated phone number");
    }

    const newNameObj = {
      name: newName,
      number: newNumber
    };

    personsService
      .create(newNameObj)
      .then(returnedPerson => {
        setPersons([...persons, returnedPerson]);
        showNotification("success!", `${newNameObj.name} has been added!`);
        setNewName("");
        setNewNumber("");
      })
      .catch(error => {
        console.log(error);
        showNotification("error!", error.response.data.error);
        // console.log(error.response.data.error);
      });
  };

  const updateData = id => {
    const person = persons.find(p => p.id === id);
    const changedPerson = { ...person, name: newName, number: newNumber };

    if (!newNumber.match(phoneno)) {
      return window.alert(`Please enter a validated phone number`);
    }

    personsService
      .update(id, changedPerson)
      .then(returnedPerson => {
        setPersons(
          persons.map(person => (person.id !== id ? person : returnedPerson))
        );

        showNotification("success!", `${newName} has been updated!`);

        setNewName("");
        setNewNumber("");
      })
      .catch(err => {
        showNotification(
          "error!",
          `the person '${person.name}' was already deleted from server`
        );
      });
    return setPersons(persons.filter(p => p.id !== id));
  };

  const filteredPersons = persons.filter(person => {
    return person.name.toLowerCase().includes(newFiliter.toLowerCase());
  });

  const handleRemove = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService
        .remove(id)
        .then(() => setPersons(persons.filter(person => person.id !== id)));
    }
    return showNotification("success!", `${name} has been deleted!`);
  };

  return (
    <div onSubmit={handleSubmit} className="App">
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
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
