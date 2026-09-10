import { useState } from "react";
import axios from "axios";
import weatherService from "../services/weatherService";

const CountryDetails = ({ country }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [countryWeather, setCountryWeather] = useState(null);
  const apiKey = import.meta.env.VITE_SOME_KEY;

  const handleShowInfos = () => {
    const newShowDetails = !showDetails;
    setShowDetails(newShowDetails);
    if (newShowDetails === true) {
      weatherService.getWeather(country.capital, apiKey).then((response) => {
        console.log(response);
        setCountryWeather(response);
      });
    }
  };

  return (
    <>
      <div key={country.cca2}>
        {country.name.common}
        <button onClick={handleShowInfos}>
          {showDetails === false ? "Show" : "Hide"}
        </button>
      </div>
      {showDetails === true ? (
        <>
          <h1>{country.name.common}</h1>
          <p>Capital {country.capital[0]}</p>
          <p>Area {country.area}</p>
          <h2>Language</h2>
          <ul>
            {Object.values(country.languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt={country.name.common}></img>
          <h2>Weather in {country.capital}</h2>
          {countryWeather ? (
            <>
              <p>Temperature {countryWeather.main.temp} Celsius</p>
              <img
                src={`https://openweathermap.org/img/wn/${countryWeather.weather[0].icon}@2x.png`}
                alt="WeatherIcon"
              ></img>
              <p>Wind {countryWeather.wind.speed} m/s</p>
            </>
          ) : (
            <>Weather not available</>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default CountryDetails;
