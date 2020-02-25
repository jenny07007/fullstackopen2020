import React, { useEffect, useState } from "react";
import Weather from "./Weather";
import axios from "axios";

const Country = ({ country }) => {
  // console.log(country);
  const [weather, setWeather] = useState();

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER}&query=${country[0].name}`
      )
      .then(res => setWeather(res.data));
  }, [country]);

  return (
    <div>
      <h2>{country[0].name}</h2>
      <p>Capital: {country[0].capital}</p>
      <p>Population: {country[0].population}</p>
      <h2>Languages</h2>
      <ul>
        <li>
          {country[0].languages.length > 0
            ? country[0].languages.map(lan => (
                <ul key={lan.numericCode} style={{ marginLeft: "-5em" }}>
                  <li key={lan.cioc}>{lan.name}</li>
                </ul>
              ))
            : ""}
        </li>
      </ul>
      <img src={`${country[0].flag}`} alt={`flag ${country[0].cioc}`} />
      <Weather weatherData={weather} />
    </div>
  );
};

export default Country;
