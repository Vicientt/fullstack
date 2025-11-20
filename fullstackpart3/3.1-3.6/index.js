require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require('morgan')

Person = require('./models/person')

const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use(morgan('tiny'))
// let persons = [
//     { 
//       "id": "1",
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": "2",
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": "3",
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": "4",
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]

// GET 3.1
app.get('/api/persons',(request,response) => {
    Person.find({}).then(result => {
        response.json(result)
    })
})

// GET 3.2 
app.get('/info', async (request,response) => {
    const count = await Person.countDocuments({})

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
        <p>Phone book has info for ${count} people</p>
        <p>${timeNY}</p>`)
})

// GET 3.3
app.get('/api/persons/:id',(request,response) => {
    Person.findById(request.params.id).then(person => {
        if (person) response.json(person)
        else response.status(404).end()
    })
})

// DELETE 3.4
app.delete('/api/persons/:id',(request,response) => {
    const id = request.params.id
    Person.findByIdAndDelete(id).then(
        () => response.status(204).end()
    )
})

// ADD 3.5 + 3.6
// const generateID = () => {
//     const ids = Math.max(...persons.map(n => Number(n.id)))
//     return persons.length > 0 ? ids : 1
// }

app.post('/api/persons',(request,response) => {
    const person = request.body
    console.log(person)

    if(!person.name || !person.number){
        return response.status(400).json({error: 'please add name/number'})
    }
    else{
        const newPerson = new Person ({
            "name": person.name,
            "number": person.number
        })

    newPerson.save().then(result => {
        response.json(result)
    })
    }
})

// PUT FUNCTION
app.put(`/api/persons/:id`,(request, response) => {
    const id = request.params.id
    const person = request.body

    const updateNoted = {
        ...person,
        "number": String(person.number)
    }
    
    Person.findByIdAndUpdate(id,updateNoted,{new: true}).then(result => {
        response.json(result)
    })
    .catch(error => response.status(400).json({error: 'malformatted id'}))
})

// --------------------------
const PORT = process.env.PORT
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})