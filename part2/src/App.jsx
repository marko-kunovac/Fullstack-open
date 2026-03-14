import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  //Array of all people
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 }
  ])
  
  //State for controlling the form input element 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filterPersons, setFilterPersons] = useState("")

  //Checking duplicity in the phonebook
  const existingPerson = () => {
    let tmp = false

    persons.forEach(person => {
      if(person.name === newName) {
        alert(`${newName} is already added to phonebook`)
        tmp = true
      }
    })

    return tmp
  }

  //Handling form's submit
  const handleSubmit = e => {
    e.preventDefault()

    let newPerson = existingPerson();

    if(!newPerson) {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      setPersons(persons.concat(personObject))
    }

    setNewName("")
    setNewNumber("")
  }

  //Handling input's value change for name
  const handleNameChange = e => {
    setNewName(e.target.value)
  }

  //Handling input's value change for number
  const handleNumberChange = e => {
    setNewNumber(e.target.value)
  }

  //Handling input's value change for searching
  const handleFilter = e => {
    setFilterPersons(e.target.value)
  }

  return(
    <div>
      <h2>Phonebook</h2>

      <Filter filterPersons={filterPersons} handleFilter={handleFilter} />

      <h3>Add a new</h3>

      <PersonForm 
        handleSubmit={handleSubmit} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} filterPersons={filterPersons}/>
    </div>
  )
}

export default App