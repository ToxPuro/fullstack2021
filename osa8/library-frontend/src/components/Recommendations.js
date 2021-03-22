import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries' 
const Recommendations = ({ show }) => {
  const response = useQuery(ALL_BOOKS)
  const userResponse = useQuery(ME)
  if (!show) {
    return null
  }
  if(response.loading){
    return <p>loading...</p>
  }
  let books = response.data.allBooks
  const genre = userResponse.data.me.favoriteGenre
  if(genre) books = books.filter(book => book.genres.includes(genre))
  return (
    <div>
      <h2>books</h2>
      {genre ? <p>books in your favorite genre <strong>{genre}</strong></p>: null}
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
    </div>
  )
}

export default Recommendations