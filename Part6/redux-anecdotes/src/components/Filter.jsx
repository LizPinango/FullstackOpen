import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault()
    let filter = event.target.value  
    console.log(filter)  
    dispatch(filterChange(filter))
  }
  
  return (
    <div className="filter-container">
      filter <input name="filter" onChange={handleChange} />
    </div>
  )
}

export default Filter