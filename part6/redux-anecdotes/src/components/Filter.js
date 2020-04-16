import React from "react";
import { useDispatch } from "react-redux";
import { filterAnecdotes } from "../actions";

const Filter = () => {
  const dispatch = useDispatch();

  const style = {
    marginBottom: 10,
  };

  const handleFilter = (e) => {
    dispatch(filterAnecdotes(e.target.value));
  };

  return (
    <div style={style}>
      Filter <input type="text" name="filter" onChange={handleFilter} />
    </div>
  );
};

export default Filter;
