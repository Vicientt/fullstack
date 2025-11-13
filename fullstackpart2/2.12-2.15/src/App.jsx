import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setfilterName] = useState('')

  // First time craw data from the server - backend
  useEffect(() => {
    console.log('start craw 1st time')
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
         setPersons(response.data)})
      }, [])

  // -------------------

  // Handle delete function
  const handleDelete = (id, name) => {
    if(window.confirm(`Delete ${name} ?`)){
    axios
      .delete(`http://localhost:3001/persons/${id}`)
      .then(() => {
        setPersons(prev => prev.filter(note => note.id !== id))
      })
    }
  }

  // -------------------
  const personsToShow = persons.filter(person =>
  person.name.toLowerCase().includes(filterName.toLowerCase())
  )
  
  const handleFilter = (event) => {
    setfilterName(event.target.value)
  }

  const handleSubmit_addperson = (event) => {
    event.preventDefault()
    const nameExists = persons.some(person => person.name === newName)
    const personExists = persons.find(person => person.name === newName)
    if (nameExists) {
      if (window.confirm(`${personExists.name} is already added to phonebook, replace the old number with a new one?`)){
      const updateNumber = {...personExists, number: newNumber}
      axios
        .put(`http://localhost:3001/persons/${personExists.id}`,updateNumber)
        .then(response => {
          setPersons(persons.map(person => person.id === personExists.id ? response.data : person))
          setNewName('')
          setNewNumber('')
        })
      return
      }
    }

    const newPerson = {name: newName, number: newNumber}
    axios
      .post("http://localhost:3001/persons", newPerson)
      .then(response => {
          setPersons(prev => prev.concat(response.data))
          setNewName('')
          setNewNumber('')
        }
      )
  }

  const handleClick_1 = (event) => {
    setNewName(event.target.value)
  }

  const handleClick_2 = (event) => {
    setNewNumber(event.target.value)
  }
  return (
    <div>
      <div>
        filter shown with <input value = {filterName} onChange = {handleFilter}/>
        {filterName.trim() !== '' && (
          <ul>
          {personsToShow.map(person => <li key = {person.id}>{person.name} {person.number}</li>)}
          </ul>)}
      </div>
      <div>
        <h2>Phonebook</h2>
        <form onSubmit = {handleSubmit_addperson}>
          <div>
            name: <input value={newName} onChange={handleClick_1}/>
          </div>
          <div>
            number: <input value={newNumber} onChange={handleClick_2}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        <ul>
          {persons.map(person => <li key = {person.id}>{person.name} {person.number} <button onClick = {() => handleDelete(person.id, person.name)}>delete</button></li>)}
        </ul>
      </div>
    </div>
  )
}

export default App
