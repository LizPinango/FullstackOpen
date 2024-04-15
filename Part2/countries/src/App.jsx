import { useState, useEffect } from "react"
import axios from "axios"
import Search from "./components/Search";
import ShowCountries from "./components/ShowCountries";

function App() {
  
  const [countries, setCountries] = useState([]);
  const [parameter, setParameter] = useState('');
  const [results, setResults] = useState([]); 

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(res => {
        //console.log(res.data);
        setCountries(res.data)
        //countries.forEach(c => console.log(c.name.common))
      })
  },[])

  const handleSearch = (e) => {
    //console.log(e.target.value);
    setParameter(e.target.value)
    if(e.target.value !== ''){
      const re = new RegExp(parameter, 'i');    
      const searchResults = countries.filter(c => c.name.common.match(re));    
      setResults(searchResults);
      //console.log(results.length)
      //results.forEach(r => console.log(r.name.common))
    }
    else{
      setResults([]);
    }
  }
 
  return (
    <>
      <Search parameter={parameter} handleSearch={handleSearch}/>
      <ShowCountries countries={results}/>
    </>
  )
}

export default App
