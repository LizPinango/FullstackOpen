import { useDispatch } from "react-redux"
import { add } from "../reducers/anecdoteReducer"
import { setNoti, resetNoti } from "../reducers/notificationReducer"
import anecdoteServices from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch() // mando las acciones al reducer 

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    const newAnecdote = await anecdoteServices.createNew(content)
    dispatch(add(newAnecdote))
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