import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Points = ({points}) => {
  if(points===1){
    return(
      <p>has 1 vote</p>
    )
  }
  return(
    <p>has {points} votes</p>
  )
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(Math.floor(Math.random()*anecdotes.length))
  const [points, setVote] = useState(new Array(anecdotes.length+2).fill(0))
  const voteHandler = () => {
    const copy = [...points]
    copy[selected]++
    if(copy[selected]> copy[copy.length-2]){
      copy[copy.length-2]=copy[selected]
      copy[copy.length-1]=selected
    }
    setVote(copy)
  }
  const anecdoteHandler = () => {
    let random = Math.floor(Math.random()*anecdotes.length)
    while(random === selected){
      random=Math.floor(Math.random()*anecdotes.length)
    }
    setSelected(random)
  }
  return (
    <div>
      <h1>Anectode of the day</h1>
      <p>{anecdotes[selected]}</p>
      <Points points={points[selected]} />
      <button onClick={voteHandler}>
        vote
      </button>
      <button onClick={anecdoteHandler}>
        next anecdote
      </button>
      <h1>Anectode with the most votes</h1>
      <p>{anecdotes[points[points.length-1]]}</p>
      <Points points={points[points[points.length-1]]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)