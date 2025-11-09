import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Button = (props) => {
    return (<button onClick = {props.onClick}>{props.text}</button>)
}

const StatisticLine = (props) => {
    return (
      <p>{props.text} {props.value} {props.signal}</p>
    )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [sum, setSum] = useState(0)
  
  // 1.12
  const [selected, setSelected] = useState(0)
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [votes, setVotes] = useState([0,0,0,0,0,0,0,0])

  // const GoodHandler = () => {
  //   setGood(good => good + 1)
  //   setSum(sum => sum + 1)
  // }

  // const BadHandler = () => {
  //   setBad(bad => bad + 1)
  //   setSum(sum => sum - 1)
  // }
  
  // const all = good + neutral + bad

  // if (all === 0)
  //   return (
  //     <div>
  //       <h1>Give Feedback</h1>
  //       <br/>
  //       <Button onClick = {GoodHandler} text = 'good'/>
  //       <Button onClick = {() => setNeutral(neutral => neutral + 1)} text = 'neutral'/>
  //       <Button onClick = {BadHandler} text = 'bad'/>
  //       <br/>
  //       <h1>statistics</h1>
  //       <p>No feedback given</p>
  //     </div>
  //   )
  // return (
  //   <div>
  //     <h1>Give Feedback</h1>
  //     <br/>
  //     <Button onClick = {GoodHandler} text = 'good'/>
  //     <Button onClick = {() => setNeutral(neutral => neutral + 1)} text = 'neutral'/>
  //     <Button onClick = {BadHandler} text = 'bad'/>
  //     <br/>
  //     <h1>statistics</h1>
  //     <StatisticLine text = "good" value = {good} />
  //     <StatisticLine text = "neutral" value = {neutral} />
  //     <StatisticLine text = "bad" value = {bad} />
  //     <StatisticLine text = "all" value = {all} />
  //     <StatisticLine text = "average" value = {sum/all} />
  //     <StatisticLine text = "positive" value = {good/all * 100} signal = "%" />
  //   </div>
  // )

  const VoteHandler = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }
  const maxIndex = votes.indexOf(Math.max(...votes))

  if (votes[maxIndex] === 0)
    return (
    <div>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <br/>
        <p>has {votes[selected]} votes</p>
        <br/>
        <Button onClick = {VoteHandler} text = 'vote'/>
        <Button onClick = {() => setSelected(selected => (selected + 1) % 8)} text = 'next anecdote' />
        <br/>
        <h1>Anecdote with most votes</h1>
        <p>All of anecdotes have 0 votes</p>
    </div>
  )
  
  return (
    <div>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <br/>
        <p>has {votes[selected]} votes</p>
        <br/>
        <Button onClick = {VoteHandler} text = 'vote'/>
        <Button onClick = {() => setSelected(selected => (selected + 1) % 8)} text = 'next anecdote' />
        <br/>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[maxIndex]}</p>
        <p>has {votes[maxIndex]} votes</p>

    </div>
  )
}

export default App
