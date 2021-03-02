import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setNewFilter] = useState('')
  const addName = (event) =>{
    event.preventDefault()
    const person={
      name: newName,
      number: newNumber
    }
    function isAlready(newName){
      for (const person of persons) {
        if(newName===person.name){
          return(true)
        }
      }
      return (false)
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
  const handeFilterChange = (event) =>{
    setNewFilter(event.target.value)
  }
  let personsToShow = persons.filter(person => person.name.toLowerCase().includes(`${newFilter}`.toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with <input value={newFilter} onChange={handeFilterChange}></input>
        </div>
      </form>
      <form onSubmit={addName}>
        <div>
          name: <input  value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person => <div key={person.name}> {person.name} {person.number}</div> )}
    </div>
  )

}

export default App