const mongoose = require('mongoose')
const url = process.env.URL

mongoose.set('strictQuery',false)
mongoose.connect(url, {family: 4})
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const notePerson = new mongoose.Schema({
    name: String,
    number: String
})

notePerson.set('toJSON',{
    transform:(document, returnObject) => {
        returnObject.id = returnObject._id.toString()
        delete returnObject._id
        delete returnObject.__v
    }
})

module.exports = mongoose.model('Person',notePerson)