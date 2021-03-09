import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Personform from './components/Personform'
import Persons from './components/Persons'
import personService from './services/persons'
import './App.css'

const Notification= ({notification}) =>{
  if(notification===null){
    return null
  }
  if(!notification.error){
    return(
      <div className="success">
        {notification.message}
      </div>
    )
  }
  return(
    <div className="error">
      {notification.message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setNewFilter] = useState('')
  const [ notification, setNotification] = useState(null)

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
            setNotification({message: `Changed ${person.number} into ${updatedPerson.number}`, error: false})
            setTimeout(()=>{
              setNotification(null)
            }, 5000)
          })
          .catch(error =>{
            console.log(error)
            setNotification({message: `${person.name} was already removed from server`, error: true})
            setTimeout(()=>{
              setNotification(null)
            },5000)
            setPersons(persons.filter(person => person.name !== newName))
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
            setNotification({ message: `Added ${returnedPerson.name} to phonebook`, er: false })
            setTimeout(() =>{
              setNotification(null)
            }, 5000)
          })
          .catch(error =>{
            setNotification({message:error.response.data.error, error:true})
            setTimeout(()=>{
              setNotification(null)
            }, 5000)

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
          setNotification({message: `Removed ${deleteperson.name}`, error: false})
          setTimeout(()=>{
            setNotification(null)
          },5000)
        })
    }
  }
  let personsToShow = persons.filter(person => person.name.toLowerCase().includes(`${newFilter}`.toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification}/>
      <Filter handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <Personform newName={newName} newNumber={newNumber} onSubmit = {addName} handleNumberChange={handleNumberChange} handleNameChange={handleNameChange}/>
      <h2>Numbers</h2>

      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )

}

export default App