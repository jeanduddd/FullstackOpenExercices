require('dotenv').config()
const express = require('express')
const Person = require('./models/person')
var morgan = require('morgan')

const app = express()

app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', function (req) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id).then(person => {
    if (person) {
      response.json(person)
    }
    else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing',
    })
  }

  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        return response.status(400).json({
          error: 'name must be unique'
        })
      }
    })
    .catch(error => next(error))

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
  const date = new Date()
  Person.countDocuments({}).then(length => {
    response.send(`
      <p>Phonebook has info for ${length} people</p>
      <p>${date}</p>
    `)
  })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  console.log(name, number)
  console.log(request.params.id)


  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
        .catch(error => next(error))
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  console.log(request.body)
  console.log(response.body)


  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})