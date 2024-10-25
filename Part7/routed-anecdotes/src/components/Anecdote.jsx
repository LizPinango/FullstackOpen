import { useParams } from 'react-router-dom'

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <p>"{anecdote.content}" by {anecdote.author}</p>
      <p>votes: {anecdote.votes}</p>
      <p>more info in: <a href={`${anecdote.info}`}>{anecdote.info}</a></p>
    </div>
  )
}

export default Anecdote

