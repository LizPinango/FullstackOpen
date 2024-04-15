const Search = ({parameter, handleSearch}) => {
  return(
    <div>
      <label htmlFor="countries">Find Countries: </label>
      <input type="text" name="countries" id="countries" value={parameter} onChange={handleSearch}/>
    </div>
  )
}

export default Search;