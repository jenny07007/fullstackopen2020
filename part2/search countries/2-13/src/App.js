import React, { useEffect, useState } from "react";
import Countries from "./Countries";
import axios from "axios";
import "./styles.css";

export default function App() {
  const [searchCountry, setSearchCountry] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.eu/rest/v2/all").then(res => {
      console.log("promise fulfilled");
      setCountries(res.data);
    });
  }, []);
  console.log("render", countries.length, "countries");

  const handleCountriesChange = e => {
    setSearchCountry(e.target.value);
  };

  const filteredCountries = countries.filter(country => {
    return country.name.toLowerCase().includes(searchCountry.toLowerCase());
  });

  const showFilteredCountry = filter => {
    setSearchCountry(filter);
  };

  return (
    <div className="App">
      <form>
        <label>find countries</label>
        <input
          type="text"
          value={searchCountry}
          onChange={handleCountriesChange}
        />
        {!searchCountry ? (
          <div style={{ marginTop: "10px" }}>no country to show</div>
        ) : (
          <Countries
            countries={filteredCountries}
            changeFilter={showFilteredCountry}
          />
        )}
      </form>
    </div>
  );
}
