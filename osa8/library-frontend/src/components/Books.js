

import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries' 
const Books = ({ show }) => {
  const [genre, setGenre ] = useState(null)
  const [uniqueGenres, setUniqueGenres] = useState([]) 
  const [ getBooks, {loading, data }] = useLazyQuery(ALL_BOOKS)
  useEffect(() => {
    console.log('getting books')
    getBooks({ variables: {genre}})
  },[genre])
  if (!show) {
    return null
  }
  if(loading || !data){
    return <p>loading...</p>
  }
  const books = data.allBooks
  const genres = [].concat.apply([],books.map(book => book.genres)).filter((value, index, self)=> self.indexOf(value) === index)
  if(genres.length>uniqueGenres.length) setUniqueGenres(genres)
  return (
    <div>
      <h2>books</h2>
      {genre ? <p>books in <strong>{genre}</strong></p>: null}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <span>
        {uniqueGenres.map(genre => <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>)}
        <button onClick={() => setGenre(null)}>all</button>
      </span>
    </div>
  )
}

export default Books