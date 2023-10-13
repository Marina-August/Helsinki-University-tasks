import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const handleNameChange =(event)=>{
      setNewName(event.target.value);
  }

  const handleNumberChange =(event)=>{
      setNewNumber(event.target.value);
  }

  const addPerson =(event)=>{
    event.preventDefault()
    const nameObject = {
      name:newName
    }

    const personObject = {
      name:newName,
      number:newNumber,
    }
    
    const personsStringify = (persons.map(person=> JSON.stringify(person.name)))
    if (personsStringify.includes( JSON.stringify(nameObject.name))){
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
          const existingPerson = persons.find(person => person.name === newName)
          const updatedPerson = { ...existingPerson, number: newNumber }
         
          personService
          .update(existingPerson.id, updatedPerson)
          .then(updPerson=>{
            const updatedPersons = persons.map(person =>
              person.name === updPerson.name ? updPerson : person
            );
            setPersons(updatedPersons)
            setNotification(`${updPerson.name} number is changed`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(`Information of ${updatedPerson.name} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
          
          setNewName('');
          setNewNumber('');
       
        }
        setNewName('')
        setNewNumber('')
        return
    }else{
      personService
      .create(personObject)
      .then(returnedPerson=> {
      const persons_ = [...persons, returnedPerson]
      setPersons(persons_)
      setNotification(`Added ${returnedPerson.name}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    })
      setNewName('')
      setNewNumber('')
    }
  
  }

  const handleFilter =(event)=>{
    setFilter(event.target.value)
    const filteredNames = persons.filter(person =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setPersons(filteredNames)  
  }

  const deleteHandler = (id, name) =>{
    if (window.confirm(`Delete ${name}?`)){
    personService
    .deletePerson(id)
    .then(answer=>{
      const persons__= persons.filter(person=> person.id!==id)
      setPersons(persons__)
    })
  }

  }

  return (
    <div>
      <h2>Phonebook</h2>
       {notification ? (
          <Notification message={notification} />
        ) : errorMessage ? (
          <Notification message={errorMessage} error={true} />
        ) : null}
       <Filter filter={filter} handleChange={handleFilter}/>
      <h2>add a new</h2>
       <PersonForm submitHandler={addPerson} newName={newName} newNumber={newNumber}
        changeNameHandler={handleNameChange} changeNumberHandler={handleNumberChange}/>
      <h2>Numbers</h2>
        <Persons persons={persons} deleteHandler={deleteHandler}/>
    </div>
  )
}

export default App
