import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const newNameObj = {
      name: newName
    };
    setPersons([...persons, newNameObj]);
    setNewName("");
  };

  const handleNameChange = e => {
    setNewName(e.target.value);
  };

  return (
    <div onSubmit={handleSubmit}>
      <h2>Phonebook</h2>
      <form>
        <div>
          name:{" "}
          <input type="text" value={newName} onChange={handleNameChange} />
        </div>
        {/* <div>debug: {newName}</div> */}
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
