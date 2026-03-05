const express = require('express')
const app = express()
// For use request.body case
app.use(express.json())

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
app.get(`/api/notes/`, (req,res) => {
    notes ? (
      res.json(notes)
    ) : (
      res.status(404).end()
    )
})
app.get(`/api/notes/:id`, (req,res) => {
    const id = req.params.id
    const note = notes.find(note => note.id === id)
    note ? (
        res.json(note)
    ) : (
        res.status(404).end(`Do not find the id of ${id}`)
    )
})

app.delete(`/api/notes/:id`, (req,res) => {
  const id = req.params.id
  notes = notes.filter(note => note.id !== id)
  res.status(204).end()
})

app.post(`/api/notes`, (req,res) => {
    const note = req.body
    if(!note.content){
      res.status(400).json({
        error: `content missing`
      })
      return 
    }

    note_exist = notes.some(n => n.content === note.content)
    if(note_exist) {
      return res.status(400).json({
        error: `this content already exists`
      })
    }

    const maxId = notes.length > 0 ? Math.max(...notes.map(n => Number(n.id))) : 0

    note.id = String(maxId + 1)
    
    const new_note = {
      id: note.id,
      content: note.content,
      important: note.important
    }
    notes = [...notes, new_note]
    res.json(new_note)
})

app.put(`/api/notes/:id`,(req,res) =>{
   const id = req.params.id
   const body = req.body

   id_exist = notes.some(n => n.id === id)
   if(!id_exist) {
    res.status(400).json(
      {error: "The data does not exist in the server"}
    )
    return
   }
  
  new_note = {
    id: id,
    ...body
  }
  notes = notes.map(n => n.id === id ? new_note : n)

  res.json(new_note)
})
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})