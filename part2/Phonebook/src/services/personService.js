import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => {
    const query = axios.get(baseUrl)
    return query.then(response => response.data)
}

const createPerson = (newObject) => {
    const query = axios.post(baseUrl, newObject)
    return query.then(response => response.data)
}

const deletePerson = (id) => {
    const query = axios.delete(`${baseUrl}/${id}`)
    return query.then(response => response.data);
    
}

export default {getPersons, createPerson, deletePerson}