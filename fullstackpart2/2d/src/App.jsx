import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import noteService from './services/notes'

const Note = ({note,toggleImportance}) => {
  const label = note.important ? 'make not important' : 'make important'

  return (
    <li>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

function App() {
  const [notes,setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  
  const toggleImportanceOf = (id) => {
  const noteChanged = notes.find(note => note.id === id)
  const changeNoted = {...noteChanged, "important": !noteChanged.important}

  noteService
  .update(id,changeNoted)
      .then(response => {
        setNotes(notes.map(note => note.id === id ? response.data : note))
      })
  }

  useEffect(() => {
    console.log('effect')
    noteService.getAll().then(response =>{
      console.log('promised fulfilled')
      setNotes(notes.concat(response.data))
    })
    // axios
    //   .get('http://localhost:3001/notes')
    //     .then((response) => {
    //       console.log('promise fulfilled')
    //       setNotes(notes.concat(response.data))
    // })
      
  }, [])
  console.log('render', notes.length, 'notes')


  const addNote = (event) => {
    event.preventDefault()

    if (newNote.trim() === ''){
      alert('Note cannot be empty!')
      return
    }
    
    const noteObject = {
      id: `${Math.round(Math.random() * 1000)}`,
      content: newNote,
      important: Math.random() > 0.5,
    }
    
    // axios
    // .post('http://localhost:3001/notes', noteObject)
    noteService
    .create(noteObject)
      .then(response => {
        console.log(response)
        setNotes(notes.concat(response.data))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}/>
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App
