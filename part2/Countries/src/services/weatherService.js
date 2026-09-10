import axios from 'axios'

const getWeather = (city, apiKey) => {
    const query = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    return query.then(response => response.data )
}

export default {getWeather}