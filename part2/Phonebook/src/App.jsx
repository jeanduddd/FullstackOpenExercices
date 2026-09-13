import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/personService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [newFilter, setNewFilter] = useState('')

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [success, setSuccess] = useState(true)

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

  const handleDeletion = (person) => {
    const id = person.id
    console.log(id)
    personService
    .deletePerson(id)
    .then(() => {
      setPersons(
        persons.filter(person => person.id !== id))
      setSuccess(true)
      setNotificationMessage(
        `${person.name} deleted successfully`
      )
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    })
    .catch(() => {
      setSuccess(false)
      setPersons(
        persons.filter(person => person.id !== id))
      setNotificationMessage(
        `${person.name} already deleted from server`
      )
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)

    })
  }

  const addName = (event) => {
    event.preventDefault()
    if (persons.filter(person => person.name === newName).length === 0){
     
      const nameObject = {
        name: newName,
        number: newNumber
      }
      personService
      .createPerson(nameObject)
      .then(response => {        
        setPersons(persons.concat(response))
        setSuccess(true)
        setNotificationMessage(
          `Added ${response.name}`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      .catch(error => {
        setSuccess(false)
        setNotificationMessage(error.response.data.error)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      
    }
    else{
      const modify = confirm(`${newName} is already added to phonebook, replace old number with a new one ?`)
      if (modify){
        const person = persons.find(n => n.name === newName)
        const changedPerson = { ...person, number: newNumber }
        personService
        .modifyNumber(changedPerson.id, changedPerson)
        .then(response => {
          setPersons(persons.map(someone => someone.id === response.id ? response : someone))
          setSuccess(true)
          setNotificationMessage(
            `${response.name}'s number modified`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(error => {
        setSuccess(false)
        setNotificationMessage(error.response.data.error)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      }
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2> 
      <Notification message={notificationMessage} success={success}></Notification>
      <Filter value={newFilter} onChange={handleFilterChange}></Filter>
      <h2>add a new</h2>
      <PersonForm onSubmit={addName} nameValue={newName} onNameChange={handleNameChange} numberValue={newNumber} onNumberChange={handleNumberChange}></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} deletion={handleDeletion}></Persons>      
    </div>
  )
}

export default App