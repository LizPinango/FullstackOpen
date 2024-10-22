import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addAnecdote } from '../services/anecdotes'
import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = () => {
  const [noti, notiDispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: addAnecdote,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notiDispatch({ type: 'SET', payload: `added '${anecdote.content}'` })
      setTimeout(() => {
        notiDispatch({ type: 'RESET' })
      }, 5000)
    },
    onError: ({response}) => {      
      notiDispatch({ type: 'SET', payload: `${response.data.error}` })
      setTimeout(() => {
        notiDispatch({ type: 'RESET' })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''    
    newAnecdoteMutation.mutate({content, votes: 0})    
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
