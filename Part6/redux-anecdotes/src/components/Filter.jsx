import { useDispatch } from "react-redux"
import { setFilter } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault()
    let filter = event.target.value       
    dispatch(setFilter(filter))
  }
  
  return (
    <div className="filter-container">
      filter <input name="filter" onChange={handleChange} />
    </div>
  )
}

export default Filter