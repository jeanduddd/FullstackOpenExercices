import { useState } from "react";

const CountryDetails = ({country}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div key={country.cca2}>
        {country.name.common}
        <button onClick={() => setShowDetails(!showDetails)}>Show</button>
      </div>
      {showDetails === true ? (
        <>
          <h1>{country.name.common}</h1>
          <p>Capital {country.capital[0]}</p>
          <p>Area {country.area}</p>
          <h2>Language</h2>
          <ul>
            {Object.values(country.languages).map((language) => (
              <li key={language} >{language}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt={country.name.common}></img>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default CountryDetails;
