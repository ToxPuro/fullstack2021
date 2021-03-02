import React from 'react'




const Person = ({person, deletePerson}) =>{
    return(
    <div>
    <span>
        {person.name} {person.number}
        <button type="Button" onClick={()=> deletePerson(person)}>Delete</button>
    </span>
    </div>
    )

}
const Persons = ({personsToShow, deletePerson}) =>{
    return(
        <div>
            {personsToShow.map(person => <Person key={person.name} person={person} deletePerson={deletePerson}/> )}
        </div>
        
    )
}

export default Persons