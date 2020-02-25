import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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
            .toLocaleLowerCase()
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

  const handleNameChange = e => {
    setNewName(e.target.value);
  };

  const handleNumberChange = e => {
    setNewNumber(e.target.value);
  };

  return (
    <div onSubmit={handleSubmit}>
      <h2>Phonebook</h2>
      <form>
        <div>
          name:
          <input type="text" value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number:
          <input type="text" value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
        <p key={person.name}>
          {person.name} - {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
