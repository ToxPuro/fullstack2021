import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer' 
import { setNotification } from '../reducers/notificationReducer'
const AnecdoteForm = ({ createAnecdote, setNotification }) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''    
        createAnecdote(content)
        setNotification(`you added ${content}`, 5000)
    }
    
    return (
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>
    )
}

const mapDispatchToProps = {
  createAnecdote, setNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)