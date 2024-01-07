import { useState, useEffect } from 'react';
import personService from './services/persons';

const Filter = ({ text, value, onChange }) => (
  <div>
    {text} <input value={value} onChange={onChange} />
  </div>
)

const PersonForm = ({ onSubmit, newName, newNumber, handleNameChange, handleNumberChange }) => (
  <form onSubmit={onSubmit}>
    <div>name: <input value={newName} onChange={handleNameChange} /></div>
    <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
    <div><button type="submit">add</button></div>
  </form>
)

const Button = ({ type, onClick, text }) => (
  <button type={type} onClick={onClick}>{text}</button>
)

const PersonEntry = ({ person, onClick }) => (
  <ul key={person.id}>
    {person?.name} {person?.number}
    <Button type={"submit"} text={"delete"} onClick={() => onClick(person.id)} />
  </ul>
);

const Persons = ({ people, onClick }) => (
  <div>
    {people.map(person => <PersonEntry key={person?.id} person={person} onClick={onClick} />)}
  </div>
)

// Fix part2 hardcoding Notification problem
const Notification = ({ info }) => {
  if (!info.message) {
    return
  }

  const style = {
    color: info.type==='error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={style}>
      {info.message}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState({ message: '',  type: 'message'})

  // Fetch the data with db.json
  useEffect(() => {
    personService
      .get()
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const notifyWith = (message, type='message') => {
    setMessage({message, type})
    setTimeout(() => {
      setMessage({ message: null} )
    }, 3000)
  }

  const addName = (event) => {
    event.preventDefault();
    const newObject = {
      name: newName,
      number: newNumber,
    }

    const checkName = persons.find(person => person.name.toLowerCase() == newName.toLowerCase())
    const changeNumber = { ...checkName, number: newNumber }
    if (checkName) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)) {
        personService
          .update(checkName.id, changeNumber)
          .then((data) => {
            console.log(data)
            setPersons(persons.map(person => person.id == checkName.id ? changeNumber : person))
            setNewName("")
            setNewNumber("")
          })
          .catch((error) => {
            notifyWith(`Information of ${newName} has already been removed from server`, 'error');
            console.error(`Adding ${newName}`, error);
          })
      } else {
        return;
      }
    } else {
      personService
        .create(newObject)
        .then((createdPerson) => {
          setPersons(persons.concat(createdPerson))
          notifyWith(`Added ${newName}`, 'message')
          window.alert(`${newName} is already added to phonebook.`)
        })
        .catch((error) => {
          console.error(error.response.data.error);
          notifyWith(`[error] ${error.response.data.error}`, 'error')
        })

        setNewName("")
        setNewNumber("")
    }
  }

  const deletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personToDelete?.name}?`)) {
      personService
        .delete(id)
        .then(response => {
          console.log(response);
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          console.error('Error deleting person:', error);
        });
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value);
  }

  const filteredPersons = persons.filter(person => person?.name.toLowerCase().includes(newFilter.toLowerCase()));
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification info={message} />
      <Filter text={"filter shown with:"} value={newFilter} onChange={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons people={filteredPersons} onClick={deletePerson} />
    </div>
  )
}

export default App