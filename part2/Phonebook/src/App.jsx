import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/personService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [newFilter, setNewFilter] = useState('')

  useEffect   (() => {
    personService
    .getPersons()
    .then(response => {
      setPersons(response)
    })
  }, [])

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    if (newName===''){
      
    }
    else if (persons.filter(person => person.name === newName).length === 0){
     
      const nameObject = {
        name: newName,
        number: newNumber
      }
      personService
      .createPerson(nameObject)
      .then(response => {        
        setPersons(persons.concat(response))
      })
      
    }
    else{
      alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2> 
      <Filter value={newFilter} onChange={handleFilterChange}></Filter>
      <h2>add a new</h2>
      <PersonForm onSubmit={addName} nameValue={newName} onNameChange={handleNameChange} numberValue={newNumber} onNumberChange={handleNumberChange}></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter}></Persons>      
    </div>
  )
}

export default App