require('dotenv').config()

const express = require('express')
const morgan = require("morgan")

const app = express()
app.use(express.json())
app.use(morgan("tiny"))

// For running frontend first
app.use(express.static('dist'))
let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// GET 3.1
app.get(`/api/persons`, (req, res) => {
    res.json(persons)
})

// Get 3.2 - info
app.get('/info', (req,res) => {
    const count = persons.length

    const timeNY = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "long"
  })
    
    res.end(`
        <p>Phone book has info for ${count} people</p>
        <p>${timeNY}</p>`)
})

// Get 3.3 - Each id
app.get('/api/persons/:id', (req,res) => {
    const id = req.params.id
    exist_id = persons.some(person => person.id === id)

    if(!exist_id){
        return res.status(404).json({
            error: 'this id does not exist'
        })
    }

    person = persons.find(p => p.id === id)
    res.json(person)
})

// Delete 3.4
app.delete('/api/persons/:id', (req,res) => {
    const id = req.params.id
    exist_id = persons.some(person => person.id === id)

    if(!exist_id){
        return res.status(404).json({
            error: 'this id does not exist'
        })
    }

    persons = persons.filter(p => p.id !== id)
    res.status(204).end(`Delete ${id} successfully!`)
})

// Post 3.5
app.post(`/api/persons`,(req,res) => {
    const max_id = persons.length > 0 ? Math.max(...persons.map(persons => Number(persons.id))) : 0
    const body = req.body

    console.log('POST request body: ', body)

    name_exist = persons.some(person => person.name === body.name)
    if(name_exist){
        return res.status(400).json({
            error: 'The name already exists'
        })
    }
    if(!body.number || !body.name){
        return res.status(400).json({
            error: 'Does not have enough information'
        })
    }

    new_person = {
        id: String(max_id + 1),
        ...body
    }

    persons = [...persons,new_person]
    res.json(new_person)
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})