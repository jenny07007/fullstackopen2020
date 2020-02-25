import React from "react";

const Weather = ({ weatherData }) => {
  if (!weatherData) return "";

  const { name } = weatherData.location;
  const {
    temperature,
    wind_dir,
    wind_speed,
    weather_icons,
    weather_descriptions
  } = weatherData.current;
  return (
    <div>
      <h2>Weahter in {name}</h2>
      <p>temperature: {temperature} Celsius</p>
      <img src={weather_icons} alt={weather_descriptions} />
      <p>
        wind: {wind_speed} {wind_dir}
      </p>
    </div>
  );
};

export default Weather;
