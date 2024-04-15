import DeleteBtn from "./DeleteBtn"

const Persons = ({persons, filteredPersons, handleClick}) => {  
  //console.log(filteredPersons.length)
  if(filteredPersons.length !== 0){    
    return (
      <ul>
        {filteredPersons.map(p => 
          <li key={p.id}>{p.name} {p.number} <DeleteBtn handleClick={()=>handleClick(p.id, p.name)}/></li>
        )}
      </ul> 
    )
  }
  else{    
    return (
      <ul>
        {persons.map(p => 
          <li key={p.id}>{p.name} {p.number} <DeleteBtn handleClick={()=>handleClick(p.id, p.name)}/></li>
        )}
      </ul> 
    )
  }
}

export default Persons