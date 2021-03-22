import React from 'react'
import { connect } from 'react-redux'
import { addVote} from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
const AnecdoteList = ({anecdotes, addVote, setNotification}) => {
    const vote = (anecdote) => {
        addVote(anecdote)
        setNotification(`you voted ${anecdote.content}`, 5000)
    }
    return(
    <div>
        {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
            <div>
            {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
            </div>
        </div>
        )}
    </div>
    )
}

const mapStatetoProps = (state) => {
    return {anecdotes: state.anecdotes.filter(a => a.content.includes(state.filter))}
}

const mapDispatchtoProps = {
    addVote, setNotification
}

export default connect(mapStatetoProps, mapDispatchtoProps)(AnecdoteList)