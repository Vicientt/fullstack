const express = require('express')
const app = express()
const morgan = require('morgan')

const cors = require('cors')
app.use(cors())
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
app.use(express.json())
app.use(morgan('tiny'))

// GET 3.1
app.get('/api/persons',(request,response) => {
    response.json(persons)
})

// GET 3.2 
app.get('/info',(request,response) => {
    
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

    response.send(`
        <p>Phone book has info for ${persons.length} people</p>
        <p>${timeNY}</p>`)
})

// GET 3.3
app.get('/api/persons/:id',(request,response) => {
    const id = request.params.id
    const person = persons.find(n => n.id === id)

    if(person){
        response.json(person)
    }
    else{
        response.status(404).end()
    }
})

// DELETE 3.4
app.delete('/api/persons/:id',(request,response) => {
    const id = request.params.id
    persons = persons.filter(n => n.id !== id)
    
    console.log(persons)
    response.status(204).end()
})

// ADD 3.5 + 3.6
const generateID = () => {
    const ids = Math.max(...persons.map(n => Number(n.id)))
    return persons.length > 0 ? ids : 1
}
app.post('/api/persons',(request,response) => {
    const person = request.body
    console.log(person)

    const checkPerson = persons.find(n => n.name === person.name)

    if(!person.name || !person.number){
        return response.status(400).json({error: 'please add name/number'})
    }
    else if(checkPerson){
        return response.status(400).json({error: 'name must be unique'})
    }
    else{
        const newPerson = {
            "id": String(generateID() + 1),
            "name": person.name,
            "number": person.number
        }

        persons = persons.concat(newPerson)
        response.json(newPerson)
        console.log(persons)
    }
})

// PUT FUNCTION
app.put(`api/persons/:id`,(request, response) => {
    const id = request.params.id
    const person = request.body

    const note = persons.find(n => n.id === id)
    if(!note){
        return response.status(404).json({error: 'note not found'})
    }

    const updateNoted = {
        ...note,
        "number": String(person.number)
    }
    persons = persons.map(n => n.id === id ? updateNoted : n)
    response.json(updateNoted)
})

app.use(express.static('dist'))
// --------------------------
const PORT = process.env.PORT || 3001
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})