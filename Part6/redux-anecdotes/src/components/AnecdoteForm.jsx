import { useDispatch } from "react-redux"
import { add } from "../reducers/anecdoteReducer"
import { setNoti, resetNoti } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch() // mando las acciones al reducer 

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    dispatch(add(content))
    //Notificación 
    dispatch(setNoti(`New anecdote added "${content}"`))        
    setTimeout(() => {
      dispatch(resetNoti())
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='newAnecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm