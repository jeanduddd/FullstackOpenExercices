const CountryList = ({countries, filter}) => {
    const filteredCoutries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    console.log('taille', filteredCoutries.length)
    if (filteredCoutries.length > 10){
        return <div>Too many matches, specify another filter</div>
    }
    if (filteredCoutries.length === 1){
        const country = filteredCoutries[0]
        console.log(country)
        return (
            <>
                <h1>{country.name.common}</h1>
                <p>Capital {country.capital[0]}</p>
                <p>Area {country.area}</p>
                <h2>Language</h2>
                <ul>
                    {Object.values(country.languages).map(language => 
                        <li>{language}</li>
                    )}
                </ul>
                <img src={country.flags.png} alt={country.name.common}></img>
                
            </>
        )
    }
    return (
        <>
            {filteredCoutries.map(country => (
                <div key={country.cca2}>{country.name.common}</div>
            ))}
        </>
    )
}

export default CountryList