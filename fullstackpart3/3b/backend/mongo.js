const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://vicientnguyenwork_db_user:${password}@cluster0.n5gzfx5.mongodb.net/noteApp?appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url, {family: 4})

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//     content: 'HTML is easy',
//     important: true,
// })

// note.save().then(result => {
//     console.log('note saved!')
//     mongoose.connection.close() //Ensure backend close and complete its execution
// })

// async function saveNotes() {
//   const note1 = new Note({
//     content: 'HTML is easy',
//     important: true,
//   })

//   const note2 = new Note({
//     content: 'CSS is fun',
//     important: false,
//   })

//   const note3 = new Note({
//     content: 'JavaScript is powerful',
//     important: true,
//   })

//   await note1.save()
//   await note2.save()
//   await note3.save()

//   console.log("Saved all notes!")
//   mongoose.connection.close()
// }

// saveNotes()

Note.find({important: true}).then(result => { // result return the array of all satisfied objects
    result.forEach(note => 
        console.log(note)
    )
    mongoose.connection.close()
})
