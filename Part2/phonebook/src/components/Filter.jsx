const Filter = ({filter, handleFilterChange}) => {
  return (
    <div>
      <label htmlFor="filter">Filter shown with </label>
      <input id="filter" name="filter" value={filter} onChange={handleFilterChange}/>
    </div>
  )
}

export default Filter;