import React from "react";

const Country = ({ country }) => {
  console.log(country);
  return (
    <div>
      <h2>{country[0].name}</h2>
      <p>{`Capital: ${country[0].capital}`}</p>
      <p>{`Population: ${country[0].population}`}</p>
      <h2>Languages</h2>
      <ul>
        <li>
          {country[0].languages.length > 0
            ? country[0].languages.map(lan => (
                <ul key={lan.numericCode} style={{ marginLeft: "-5em" }}>
                  <li>{lan.name}</li>
                </ul>
              ))
            : ""}
        </li>
      </ul>
      <img src={`${country[0].flag}`} alt={`flag ${country[0].cioc}`} />
    </div>
  );
};

export default Country;
