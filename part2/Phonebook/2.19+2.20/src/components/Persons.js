import React from "react";

const Persons = ({ persons, handeRemove }) => {
  return persons.map(person => (
    <p key={person.number}>
      {person.name} - {person.number}
      <button
        className="deleteBtn"
        onClick={() => handeRemove(person.id, person.name)}
      >
        Delete
      </button>
    </p>
  ));
};

export default Persons;
