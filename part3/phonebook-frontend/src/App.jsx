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

const Notification = ({ message }) => {
  if (message.length == 0) {
    return null
  } else {
    if (message.includes("removed")) {
      const type = "error";
      return (
        <div className={type}>
          {message}
        </div>
      )
    } else {
      const type = "message";
      return (
        <div className={type}>
          {message}
        </div>
      )
    }
  }
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState('')

  // Fetch the data with db.json
  useEffect(() => {
    personService
      .get()
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const addName = (event) => {
    event.preventDefault();
    const newObject = {
      id: persons.length + 1,
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
            setMessage(`Information of ${newName} has already been removed from server`);
            setTimeout(() => setMessage(""), 5000) 
            console.error(`Adding ${newName}`, error);
          })
      } else {
        return;
      }
    } else {
      personService
        .create(newObject)
        .then(response => {
          console.log(response)
          setPersons(persons.concat(newObject))
          setMessage(`Added ${newName}`)
          setTimeout(() => {
            setMessage("")
          }, 3000)
        })

      window.alert(`${newName} is already added to phonebook.`)
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
      <Notification message={message} />
      <Filter text={"filter shown with:"} value={newFilter} onChange={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons people={filteredPersons} onClick={deletePerson} />
    </div>
  )
}

export default App