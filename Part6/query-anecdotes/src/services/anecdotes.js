import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => axios.get(baseUrl).then(res => res.data)

export const addAnecdote = newAnecdote => 
  axios.post(baseUrl, newAnecdote).then(res => res.data)

export const upvote = voted => 
  axios.put(`${baseUrl}/${voted.id}`, voted).then(res => res.data)