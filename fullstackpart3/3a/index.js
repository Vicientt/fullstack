const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

app.use(express.static('dist'))
let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/',(request,response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/notes/', (request,response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request,response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === id)
    if(note){
    response.json(note)
    }
    else{
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

// POST function

const generateId = () => {
    const maxId = Math.max(...notes.map(note => Number(note.id)))
    return String(maxId + 1)
}

app.use(express.json())
app.post('/api/notes', (request,response) => {
    const note = request.body

    if (!note.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const newNote = {
        "id": generateId(),
        "content": note.content,
        "important": note.important || false
    }

    notes = notes.concat(newNote)
    console.log(newNote)
    console.log(notes)
    response.json(newNote)
})

// PUT function
app.put('/api/notes/:id', (request,response) => {
    const id = request.params.id
    const body = request.body //JSON

    const note = notes.find(n => n.id === id)
    if(!note){
        return response.status(404).json({error: 'note not found'})
    }

    const updatedNote = {
        ...note,
        content: body.content,
        important: body.important
    }
    
    notes = notes.map(n => n.id === id ? updatedNote : n)
    
    response.json(updatedNote)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)})