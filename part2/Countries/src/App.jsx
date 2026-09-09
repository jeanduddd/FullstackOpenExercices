import { useEffect, useState } from "react"
import axios from 'axios'
import SearchCountries from "./components/SearchCountries"
import CountryList from "./components/CountryList"

const App = () => {

  const [searchedCountry, setSearchedCountry] = useState('')
  const [countries, setCountries] = useState([])

  const handleFieldChange = (event) => {
    console.log(event.target.value)
    setSearchedCountry(event.target.value)
  }

  useEffect(() => {
    console.log('fetching countries');
    axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then(response => {
      console.log(response.data[0]);
      setCountries(response.data)  
    })
  }, [])

  console.log('avant ', countries)

  return (
    <div>
      <SearchCountries searchedValue={searchedCountry} onChange={handleFieldChange}></SearchCountries>
      <CountryList countries={countries} filter={searchedCountry}></CountryList>
      {/*{countries.length === 0 ? display d un pays : display de tt}*/}
    </div>
  )
}

export default App