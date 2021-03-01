import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>
    {text}
    </button>
  )

}

const StatiscitLine = ({text, value}) => {
  return(
    <tr>
      <th>{text}</th>
      <th>{value}</th> 
    </tr>
  )
}

const Statistics = ({good,bad,neutral}) => {
  if (good+bad+neutral === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <table>
      <StatiscitLine text="good" value={good} />
      <StatiscitLine text="neutral" value={neutral} />
      <StatiscitLine text="bad" value={bad} />
      <StatiscitLine text="all" value={good+neutral+bad} />
      <StatiscitLine text="average" value={(good-bad)/(good+neutral+bad)} />
      <StatiscitLine text="positive" value={100*(good/(good+neutral+bad))} />
    </table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good+1)} text="good" />
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() => setBad(bad+1)} text="bad" />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
