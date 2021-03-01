import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>

    </>
  )
}
const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercise}
      </p>
    </div>
  )
}
const Content = (props) => {
  return (
    <div>
      <Part part={props.list[0]} exercise={props.list[1]}/>
      <Part part={props.list[2]} exercise={props.list[3]}/>
      <Part part={props.list[4]} exercise={props.list[5]}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.list[0]+props.list[1]+props.list[2]}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const list = [part1,exercises1,part2,exercises2,part3,exercises3]
  const exerciselist=[exercises1,exercises2,exercises3]
  return (
    <div>
      <Header course={course} />
      <Content list={list} />
      <Total list={exerciselist}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
