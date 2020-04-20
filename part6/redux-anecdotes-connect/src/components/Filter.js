import React from "react";
import { connect } from "react-redux";
import { filterAnecdotes } from "../actions";

const Filter = ({ filterAnecdotes }) => {
  const style = {
    marginBottom: 10,
  };

  const handleFilter = (e) => {
    filterAnecdotes(e.target.value);
  };

  return (
    <div style={style}>
      Filter <input type="text" name="filter" onChange={handleFilter} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { filters: state.filters };
};

export default connect(mapStateToProps, { filterAnecdotes })(Filter);
