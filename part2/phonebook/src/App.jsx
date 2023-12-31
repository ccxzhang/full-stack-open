import { useState } from 'react'

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

const PersonEntry = ({ person }) => (
  <div>
    <ul key={person?.id}>{person?.name} {person?.number}</ul>
  </div>
);

const Persons = ({ people }) => (
  <div>
    {people.map(person => <PersonEntry person={person} />)}
  </div>

)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addName = (event) => {
    event.preventDefault();
    const newObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    }
    setPersons(persons.concat(newObject));

    window.alert(`${newName} is already added to phonebook.`)
    setNewName("")
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
      <Filter text={"filter shown with:"} value={newFilter} onChange={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons people={filteredPersons} />
    </div>
  )
}

export default App