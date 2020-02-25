import React from "react";
import Country from "./Country";

const Countries = ({ countries, changeFilter }) => {
  const renderFilteredCountries = () =>
    countries.length > 10 ? (
      <p>To many matches, specifiy another filter</p>
    ) : countries.length === 1 ? (
      <Country country={countries} />
    ) : (
      <ul>
        {countries.map(c => (
          <li key={c.numericCode} name={c.name}>
            {c.name}
            <button onClick={() => changeFilter(c.name)}>Show</button>
          </li>
        ))}
      </ul>
    );

  return <div style={{ marginTop: "30px" }}>{renderFilteredCountries()}</div>;
};

export default Countries;
