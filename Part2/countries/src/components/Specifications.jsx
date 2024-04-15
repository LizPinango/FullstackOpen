import axios from "axios";
import { useEffect, useState } from "react";

const Specifications = ({country}) => {

  const [weather, setWeather] = useState(null)

  const key = import.meta.env.VITE_API_KEY;
  //console.log(key);

  useEffect(() => {
    //console.log('effect')
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${key}`)
    .then(res => {
      //console.log(res.data);
      setWeather(res.data);      
    })    
  },[])  

  if(weather !== null){
    const url = "http://openweathermap.org/img/w/";
    const iconUrl = url + weather.weather[0].icon + ".png";
    return(
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population} people</p>
        <h3>Languages</h3>
        <ul>
          {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt}/>  
        <h3>Weather in {country.capital}</h3>
        <p>{weather.weather[0].description}</p>
        <img src={iconUrl}  alt='Weather icon'/>
        <p>Temperature: {Math.round(weather.main.temp - 273.15)} °C</p>         
        <p>Wind: {weather.wind.speed} m/s</p>

      </div>
    )
  }
  return(
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population} people</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt}/>        
    </div>
  )  
}

export default Specifications