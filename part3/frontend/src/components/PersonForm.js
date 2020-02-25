import React from "react";

const AddNewData = ({ newName, newNumber, setNewName, setNewNumber }) => {
  const handleNameChange = e => {
    setNewName(e.target.value);
  };

  const handleNumberChange = e => {
    setNewNumber(e.target.value);
  };
  return (
    <form>
      <div className="form-input">
        <label>name</label>
        <input
          type="text"
          value={newName}
          onChange={handleNameChange}
          placeholder="Must have 3 characters"
        />
      </div>
      <div className="form-input">
        <label>number</label>
        <input
          type="text"
          value={newNumber}
          onChange={handleNumberChange}
          placeholder="10 numbers without symbols"
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
export default AddNewData;
