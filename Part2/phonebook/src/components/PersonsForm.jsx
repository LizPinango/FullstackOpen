const PersonsForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        <label htmlFor="name">Name: </label>
        <input id="name" name="name" value={newName} onChange={handleNameChange} />
      </div>
      <div>
        <label htmlFor="number">Number: </label>
        <input id="number" name="number" value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonsForm;