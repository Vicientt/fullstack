import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

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
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
    </div>
  )
}

export default App
