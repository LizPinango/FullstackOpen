import { useState } from 'react'
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom'
import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import About from './components/About'
import CreateNew from './components/CreateNew'
import Footer from './components/Footer'
import Anecdote from './components/Anecdote'
import Notification from './components/Notification'


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState(null)

  const navigate = useNavigate()

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    handleNoti(`new anecdote added "${anecdote.content}"`)    
    navigate('/')
  }

  const anecdoteById = (id) => anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const handleNoti = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)      
    }, 5000)
  }

  const match = useMatch('/:id')
  const anecdote = match 
    ? anecdotes.find(a => a.id === Number(match.params.id))
    : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification}/>

      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />}></Route>
        <Route path='/:id' element={<Anecdote anecdote={anecdote}/>}></Route>
        <Route path='/create' element={<CreateNew addNew={addNew} />}></Route>
        <Route path='/about' element={<About />}></Route>
      </Routes>     
      
      <Footer />
    </div>
  )
}

export default App
