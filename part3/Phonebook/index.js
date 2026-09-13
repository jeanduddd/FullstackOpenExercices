var morgan = require('morgan')
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

let phonebook = [
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

app.use(express.static('dist'))
app.use(express.json())

const tokens = morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/persons', (request, response) => {
   response.json(phonebook)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = phonebook.find((person) => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  phonebook = phonebook.filter(person => person.id !== id)

  response.status(204).end()
})

const generateID = () => {
  const id = Math.floor(Math.random() * 1000)
  return id
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number){
    return response.status(400).json({
      error: 'content missing',
    })
  }

  const personExists = phonebook.find(person => person.name === body.name)
  if (personExists){
    return response.status(400).json({
      error: 'name must be unique',
    })
  }

  
  const person = {
    name: body.name,
    number: body.number,
    id: generateID(),
  }
  
  phonebook = phonebook.concat(person)

  response.send(person)
})

app.get('/info', (request, response) => {
  const date = new Date()
  const length = phonebook.length

  response.send(`
      <p>Phonebook has info for ${length} people</p>
      <p>${date}</p>
    `)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})