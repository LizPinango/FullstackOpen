import { useSelector, useDispatch } from "react-redux"
import { upvote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch() 
  const anecdotes = useSelector(state => {
    if( state.filter === ''){
      return state.anecdote
    }
    const re = new RegExp(state.filter, 'i')
    return state.anecdote.filter(a => a.content.match(re))
  }) 
  
  return (
    <div>          
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id} className="anecdote-container">
          <div className="anecdote-text">
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button className="btn-voting" onClick={() =>  dispatch(upvote(anecdote.id))}>
              vote
            </button>
          </div>
        </div>
      )} 
    </div>
  )
}

export default AnecdoteList