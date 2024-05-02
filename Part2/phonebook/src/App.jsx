import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonsForm from './components/PersonsForm'
import personServices from './services/persons'
import Notification from './components/Notifications'

const App = () => {  
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('');
  const [ filter, setFilter ] = useState('');
  const [ filteredPersons, setFilteredPersons] = useState([]);
  const [ message, setMessage] = useState(null);
  const [ error, setError] = useState(false)

  useEffect(() => {   
    personServices.getAll()
      .then(res => {        
        setPersons(res.data)
      })     
  },[])

  const addPerson = (e) => {
    e.preventDefault();    
    const nameExists = persons.find(p => p.name === newName)    
    if (nameExists){
      if (window.confirm(`${nameExists.name} is already added to the phonebook, replace the old number with the new one?`)){        
        const changedPerson = {...nameExists, number: newNumber}
        personServices.update(changedPerson.id, changedPerson)
          .then(res => {
            console.log('number replaced');
            setPersons(persons.map(p => p.id !== changedPerson.id ? p : res.data))
            setNewName('');
            setNewNumber(''); 
            handleMessage(`changed contact info of ${res.data.name}`)
          })
          .catch(err => {   
            console.log('Index Erorr: ',err);         
            setError(true);
            handleMessage(err.response.data.error)
          })
      }      
    }else{
      const newPerson = {
        name: newName,
        number: newNumber,
      }

      personServices.add(newPerson)
        .then(res => {
          setPersons(persons.concat(res.data));
          setNewName('');
          setNewNumber('');   
          handleMessage(`${res.data.name} was added to phonebook`)       
        })   
        .catch(err => {
          console.log(err.response.data.error);
          setError(true);
          handleMessage(`${newPerson.name} could not be added to phonebook. ${err.response.data.error}`)
        })  
    }    
  }

  const handleNameChange = (e) => {    
    setNewName(e.target.value);
  }

  const handleNumberChange = (e) => {    
    setNewNumber(e.target.value);
  }

  const handleFilterChange = (e) => {    
    setFilter(e.target.value)    
    if(e.target.value !== ''){
      const re = new RegExp(filter, 'i');    
      const filtPer = persons.filter(p => p.name.match(re));    
      setFilteredPersons(filtPer);
    }
    else{
      setFilteredPersons([]);
    }
  }

  const handleClick = (id, name) => {
    if (window.confirm(`Do you want to delete ${name}`)) {      
      personServices.deleteOne(id)
        .then(res => {
          console.log(`deleted person with id ${id}`)   
          console.log(res)       
          setPersons(persons.filter(p => p.id !== id))
          handleMessage(`${name} was deleted`)
        })
        .catch(err => {
          setError(true);
          handleMessage(`${name} could not be deleted`)
        })
    }    
  }

  const handleMessage = (message) => {
    setMessage(message)          
    setTimeout(() => {
      setMessage(null);
      setError(false)
    }, 7000)
  }
   
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} error={error}/>

      <h2>Filter Number</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>

      <h2>Add a New Number</h2>
      <PersonsForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>      
      <Persons persons={persons} filteredPersons={filteredPersons} handleClick={handleClick} />            
    </div>
  )
}

export default App