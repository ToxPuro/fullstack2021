import React, {useState} from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_BIRTHYEAR } from '../queries'
import Select from "react-select";


const Authors = ({show}) => {
  const response = useQuery(ALL_AUTHORS)
  if(!show){
    return null
  }
  if (response.loading) {
    return(
      <p>loading...</p>
    )
    
  }
  const authors = response.data.allAuthors
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
    <SetBirthYear authors={authors} />
    </div>
  )
}

const SetBirthYear = ({ authors }) => {
  const [ selectedOption, setSelectedOption ] = useState('')
  const [ birthyear, SetBirthYear] = useState('')
  const [ updateBirthyear] = useMutation(UPDATE_BIRTHYEAR)
  const submit = (event) => {
    event.preventDefault()
    updateBirthyear({ variables: {name: selectedOption.value, birthyear: Number(birthyear)}})
    setSelectedOption('')
    SetBirthYear('')

  }
  const authorOptions = authors.map(author => ({value: author.name, label: author.name}))
  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <Select defaultvalue={selectedOption} onChange={setSelectedOption} options={authorOptions}/>
        </div>
        <div>
          born 
          <input type="number" value={birthyear} onChange={({ target }) => SetBirthYear(target.value)} />
        </div>
        <div>
          <button type="submit">update author</button>
        </div>
      </form>
    </div>
  )
}

export default Authors