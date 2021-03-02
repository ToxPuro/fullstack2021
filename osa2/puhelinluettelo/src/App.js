import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Personform from './components/Personform'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setNewFilter] = useState('')

  useEffect(() =>{
    personService
      .getAll()
        .then(initialpersons =>{
          setPersons(initialpersons)
        })
  }, [])

  const addName = (event) =>{
    event.preventDefault()
    let person={
      name: newName,
      number: newNumber
    }
    if (!newName.replace(/\s/g, '').length){
      alert('Please enter a name')
    }
    else if(persons.filter(person => person.name===newName).length>0){
      person = persons.filter(person => person.name===newName)[0]
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new?`)){
        personService
          .changeNumber(person, newNumber)
          .then(updatedPerson =>{
            setPersons(persons.map(person => person.name!==newName ? person : updatedPerson))
            setNewName('')
            setNewNumber('')
          })
      }
    }
    else{
      personService
        .create(person)
          .then(returnedPerson =>{
            console.log(returnedPerson)
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
          })
    }


  }
  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) =>{
    setNewFilter(event.target.value)
  }
  const deletePerson= (deleteperson) =>{
    if(window.confirm(`Delete ${deleteperson.name}`)){
      personService
        .deletePerson(deleteperson)
        .then(response =>{
          setPersons(persons.filter(person => person !== deleteperson))
        })
    }
  }
  let personsToShow = persons.filter(person => person.name.toLowerCase().includes(`${newFilter}`.toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <Personform newName={newName} newNumber={newNumber} onSubmit = {addName} handleNumberChange={handleNumberChange} handleNameChange={handleNameChange}/>
      <h2>Numbers</h2>

      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )

}

export default App