import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Personform from './components/Personform'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setNewFilter] = useState('')

  useEffect(() =>{
    axios
      .get('http://localhost:3001/persons')
      .then(response =>{
        setPersons(response.data)
      })
  }, [])

  const addName = (event) =>{
    event.preventDefault()
    const person={
      name: newName,
      number: newNumber
    }
    function isAlready(newName){
      for (const person of persons) {
        if(newName===person.name){
          return true
        }
      }
      return false
    }
    if (!newName.replace(/\s/g, '').length){
      alert('Please enter a name')
    }
    else if(isAlready(newName)){
      alert(`${newName} is already added to phonebook`);
    }
    else{
      setPersons(persons.concat(person))
      setNewName('')
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
  let personsToShow = persons.filter(person => person.name.toLowerCase().includes(`${newFilter}`.toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange}/>
      <Personform onSubmit = {addName} handleNumberChange={handleNumberChange} handleNameChange={handleNameChange}/>
      <h2>Numbers</h2>

      <Persons personsToShow={personsToShow} />
    </div>
  )

}

export default App