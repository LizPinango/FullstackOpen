import ResultsList from "./ResultsList";

const ShowCountries = ({countries}) => {
  if(countries.length > 10){
    return(
      <p>Too many results</p>
    )
  }else if (countries.length > 0){
    return(
      <ResultsList countries={countries}/>
    )
  }else{   
    return(
      <p>no results</p>
    )    
  }
}

export default ShowCountries