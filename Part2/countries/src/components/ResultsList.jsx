import { useState } from "react";
import Specifications from "./Specifications";

const ResultsList = ({countries}) =>{ 
    
  const [country, setCountry] = useState()
  const [show, setShow] = useState(false);

  //console.log('show',show)

  const handleClick = (c) => {
    //console.log('c tiene: ', c)    
    setShow(!show)
    setCountry(c)    
  }

  if (countries.length <2 || show === true ){
    if(show === true){
      //console.log('entro a specifications')
      //console.log(country)      
      return(          
        <div>
          <Specifications country={country}/>
        </div>
      )
    }
    //console.log('false')    
    return(
      <div>
        <Specifications country={countries[0]}/>
      </div>
    )    
  }
  return(
    <div>
      <ul>
        {countries.map(c => 
          <li key={c.name.common}>
            {c.name.common} <button onClick={() => handleClick(c)}>show</button>
          </li>)
        }
      </ul>
    </div>    
  )
}

export default ResultsList