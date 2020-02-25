import React from "react";

const Filter = ({ newFiliter, setNewFilter }) => {
  const handleFilteredChange = e => {
    setNewFilter(e.target.value);
  };
  return (
    <form>
      <label>filter shown with</label>
      <input type="text" value={newFiliter} onChange={handleFilteredChange} />
    </form>
  );
};
export default Filter;
