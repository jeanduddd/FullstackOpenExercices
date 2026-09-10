import axios from 'axios'

const getCountries = () => {
    const query = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    return query.then(response => response.data )
}

export default {getCountries}