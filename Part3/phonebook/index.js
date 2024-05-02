require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person')

const app = express();

app.use(express.static('dist'))
app.use(express.json());
app.use(cors());

app.use(morgan((tokens, req, res) => [
  tokens.method(req, res),
  tokens.url(req, res),
  tokens.status(req, res),
  tokens.res(req, res, 'content-length'), '-',
  tokens['response-time'](req, res), 'ms',
  JSON.stringify(req.body),
].join(' ')));

app.get('/info', (req, res) => {//Conecta con la DB
  const date = new Date();
  Person.find({}).then((persons) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`);
  });  
})

app.get('/api/persons', (req, res) => { //conecta con la BD 
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res, next) => {//Conecta con la DB  
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

//Conecta con la DB - Error Handler 
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {//Conecta con la DB
  const body = req.body;
  
  if (!body.number) {
    return res.status(400).json({ 
      error: 'number missing' 
    })
  }
  
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch(error => next(error))
})

//Conecta con la DB - Error Handler
app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, {new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {      
      if(!updatedPerson){
        res.status(400).send({ error: 'The Person has been eliminated of the phonebook' })
      }else{
        res.json(updatedPerson)
      }
    })   
    .catch(error => next(error)) 
})
/*NOTE: findByIdAndUpdate returns null if the id doesn't exist in the DB
it does NOT return an error, therefor catch(error => next(error)) doesn't work and in this cases creates an error whith the frontend 
thats why i verified that what the function returns is not null and in cases is it i just send a code 400 
DO NOT eliminate the .catch because it is needed for the validation*/

//Error Handler Middleware 
const errorHandler = (error, req, res, next) => {
  console.log('ErrorHandler: ', error.message);
  console.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } 
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})