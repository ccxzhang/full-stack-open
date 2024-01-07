const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

require('dotenv').config();
const Person = require('./models/person');

app.use(express.static('dist'));
app.use(express.json());
app.use(morgan('tiny'));
morgan.token('body', function (req, res) {
  return JSON.stringify(req.body);
});
app.use(cors());

app.get('/', (request, response) => {
  response.send('Nothing Exists Here.');
});

// Fix info page does not work
app.get('/info', (request, response) => {
  Person.countDocuments({}).then(count => {
    const date = new Date();
    const infoHTML = `<p>Phonebook has info for ${count} people</p>${date}`;
    response.send(infoHTML);
  });
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons);
  });
});

// 3.18 -- Cleared with Postman/Browser
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

// 3.17 Use findByIdandUpdate and Remove checkName from app.post()
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body;

  Person.findByIdAndUpdate(request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson);
    })
    .catch(error => next(error));
});

// 3.15 Exercise -- Tested with Postman
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

/*
const generateId = () => {
    const randomId = persons.length > 0 ? Math.floor(Math.random() * 1_000_000) : 0;
    return randomId + 1;
}
*/

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.post('/api/persons', (request, response, next) => {
  const body = request.body;
  const person = new Person({
    name: body.name,
    number: body.number
  });

  person.save()
    .then(savedPerson => {
      response.json(savedPerson);
    })
    .catch(error => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
