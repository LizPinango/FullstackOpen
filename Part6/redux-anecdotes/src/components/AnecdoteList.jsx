import { useSelector, useDispatch } from "react-redux"
import { upvote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state) //accedo a la info en la store 
  const dispatch = useDispatch() // mando las acciones al reducer 

  return (
    <div>          
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() =>  dispatch(upvote(anecdote.id))}>vote</button>
          </div>
        </div>
      )} 
    </div>
  )
}

export default AnecdoteList