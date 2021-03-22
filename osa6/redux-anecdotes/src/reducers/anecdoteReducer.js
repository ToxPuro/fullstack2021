
import anecdoteService from '../services/anecdoteService'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const newAnecdote = action.newAnecdote
      return state.map(a => a.id!==newAnecdote.id ? a : newAnecdote).sort((a,b) => b.votes-a.votes)
    case 'ADD':
      const anecdote = action.anecdote
      return state.concat(anecdote)
    case 'INITIALIZE':
      return action.anecdotes.sort((a,b) => b.votes-a.votes)
    default:
      return state
  }
}



export const addVote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.addVote(anecdote)
    dispatch({type: 'VOTE', newAnecdote})
  }
  
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote  = await anecdoteService.createNew(content)
    dispatch({type: 'ADD', anecdote})
  }
}


export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({type: 'INITIALIZE', anecdotes})
  }
}

export default reducer