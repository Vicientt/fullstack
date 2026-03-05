import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import noteService from './service/notes'
const App = () => {
  const [list, setList] = useState([])
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  // Get all data for the first time
  useEffect(() =>{
    noteService.
      getData()
        .then(response => setList(response))
  },[])
  
  const handleDelete = (id,name) => {
    noteService.
      deleteData(id,name)
        .then(() => {
          setList(array => array.filter(n => n.id !== id))
          console.log(`Delete ${name} successfully!`)
        }
        )
  }

  const handleSubmit = (event, name_id, number_id) => {
    event.preventDefault()
    const existObject = list.some(n => n.name === name_id)

    if (existObject) {
      if (window.confirm(`${name_id} already exists. Do you want to update the number?`)) {
        const find_id = list.find(n => n.name === name_id)
        const new_update = {
          'name': `${name_id}`,
          'number': `${number_id}`
        }
        noteService
          .putData(find_id.id, new_update)
          .then(response => {
            setList(list => list.map(n => n.id === response.id ? response : n))
          })
        setName('')
        setNumber('')
     }
    } 
    else{
        const new_update = {
          'name': `${name_id}`,
          'number': `${number_id}`
        }
        noteService
          .postData(new_update)
          .then(response => {
            setList([...list, response])
            console.log(response)
          })
        setName('')
        setNumber('')
     }
  }

  return (
    <>
      <h1>Phone book</h1>

      <>
      <h1>Add new</h1>
      <form onSubmit = {(event) => handleSubmit(event, name, number)}>
        name: <input onChange = {(event) => setName(event.target.value)} value = {name} />
        <br/>
        number: <input onChange = {(event) => setNumber(event.target.value)} value = {number} />
        <br/>
        <button type = "submit">Add</button>
      </form>
      </>

      <>
      <h1>Numbers</h1>
        <ul>
          {list.map(n => <div key = {n.id}>{n.name} {n.number} <button onClick={() => handleDelete(n.id, n.name)}>Delete</button> </div>)}
        </ul>
      </>
    </>


  )
}

export default App
