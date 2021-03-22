import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useApolloClient } from '@apollo/client';
import Recommendations from './components/Recommendations'
import LoginForm from './components/LoginForm'
const App = () => {
  const [ token, setToken ] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()
  useEffect(() => {
    const token = localStorage.getItem('user-token')
    if(token){
      setToken(token)
    }
  },[])
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  if(!token){
    return(
      <LoginForm setToken={setToken}/>
    )
  }
  return (
    <div>
      <div>
        <p>{localStorage.getItem('user-token')}</p>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommendations')}>recommendations</button>
        <button onClick={() => logout()}>logout</button>
      </div>

      <Authors
        show={page === 'authors'}
      />
     
      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />
      <Recommendations
      show={page ==='recommendations'}
      />
    </div>
  )
}

export default App