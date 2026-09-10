import CountryDetails from "./CountryDetails"

const CountryList = ({countries}) => {
        console.log('taille', countries.length)
    if (countries.length > 10){
        return <div>Too many matches, specify another filter</div>
    }
    return (
        <>
            {countries.map(country => (
                <CountryDetails key={country.cca2} country={country}></CountryDetails>
                
            ))}
        </>
    )
}

export default CountryList