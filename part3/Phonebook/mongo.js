const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]

const url = `mongodb+srv://jeanduddd_db_user:${password}@cluster0.srg5dlj.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (!personName && !personNumber){
  Person.find({}).then(
    persons => {
      console.log('phonebook');      
      persons.forEach(person => {
        console.log(person.name,' ', person.number);
      })
      mongoose.connection.close()
    }
  )
}
else{
    
  const person = new Person({
    name: personName,
    number: personNumber,
  })

  person.save().then(result => {
    console.log(`added ${personName} number ${personNumber} to phonebook`)
    mongoose.connection.close()
  })
}