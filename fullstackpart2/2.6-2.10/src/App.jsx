import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' ,number: '740-357-9872'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setfilterName] = useState('')

  const personsToShow = persons.filter(person =>
  person.name.toLowerCase().includes(filterName.toLowerCase())
  )
  
  const handleFilter = (event) => {
    setfilterName(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nameExists = persons.some(person => person.name === newName)
    
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }
    setPersons(persons.concat({name: newName, number: newNumber}))
    setNewName('')
    setNewNumber('')
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
          {personsToShow.map(person => <li>{person.name} {person.number}</li>)}
          </ul>)}
      </div>
      <div>
        <h2>Phonebook</h2>
        <form onSubmit = {handleSubmit}>
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
          {persons.map(person => <li>{person.name} {person.number}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default App
