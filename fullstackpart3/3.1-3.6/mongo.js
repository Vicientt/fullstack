// Passing 3 command-line and it will print added Anna number 040-1234556 to phonebook
// Print the database name + Name + number from that
/* { 
      "id": "1", -> Khong can
      "name": "Arto Hellas", 
      "number": "040-123456"
    }
*/

const mongoose = require('mongoose')
if (process.argv.length === 5){

    console.log("ADD PEOPLE")
    const password = process.argv[2]
    const name = process.argv[3]
    const number = process.argv[4]

    const url = `mongodb+srv://vicientnguyenwork_db_user:${password}@cluster0.n5gzfx5.mongodb.net/phonebook?appName=Cluster0`

    mongoose.set('strictQuery', false)
    mongoose.connect(url,{family: 4})

    const personSchema = new mongoose.Schema({
        name: String,
        number: String,
    })

    const Person = mongoose.model('Person', personSchema)

    const person = new Person({
        name: name,
        number: number,
    })

    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}
else if (process.argv.length === 3){
    console.log("SHOW INFORMATION")

    const password = process.argv[2]

    const url = `mongodb+srv://vicientnguyenwork_db_user:${password}@cluster0.n5gzfx5.mongodb.net/phonebook?appName=Cluster0`

    mongoose.set('strictQuery', false)
    mongoose.connect(url,{family: 4})

    const personSchema = new mongoose.Schema({
        name: String,
        number: String,
    })

    const Person = mongoose.model('Person', personSchema)
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(note => {
            console.log(`${note.name} ${note.number}`)
        })
        mongoose.connection.close()
    })
}