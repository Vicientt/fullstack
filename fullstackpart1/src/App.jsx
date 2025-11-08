import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Header = (props) => {
    return (
     <h1>
         {props.course}
      </h1>
    )
  }
  
  const Part = (props) => {
    return (
      <p>{props.a} {props.b}</p>
    )
  }
  const Content = (props) => {
    return (
      <div>
          <Part a = {props.part1} b = {props.exercises1}/>
          <Part a = {props.part2} b = {props.exercises2}/>
          <Part a = {props.part3} b = {props.exercises3}/>
      </div>
    )
  }

  const Total = (props) => {
      return <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises2} </p>
  }

  return (
    <div>
      <Header course={course.name} />
      <Content part1={course.parts[0].name} part2={course.parts[1].name} part3={course.parts[2].name} exercises1={course.parts[0].exercises} exercises2={course.parts[1].exercises} exercises3={course.parts[2].exercises}/>
      <Total exercises1={course.parts[0].exercises} exercises2={course.parts[1].exercises} exercises3={course.parts[2].exercises}/>
    </div>
  )
}

export default App
