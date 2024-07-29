import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)  
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if (loggedUserJson){
      const user = JSON.parse(loggedUserJson)
      setUser(user) 
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('login: ', username, password)
    try{
      const user = await loginService.login({
        username, password
      })
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedUser', JSON.stringify(user))      
      handleMessage(`${user.username} logged in`)
    }catch (err) {        
      setError(true)
      handleMessage(`${err.response.data.error}`)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
    console.log('logged out')
  }

  const addBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    console.log(newBlog)

    blogService
      .create(newBlog)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setNewTitle('')
          setNewAuthor('')
          setNewUrl('')
          handleMessage(`a new blog '${returnedBlog.title}' by ${returnedBlog.author} added`)
        })
        .catch(err => {
          console.log(err);         
          setError(true);
          handleMessage(err.response.data.error)
        })
  }

  const handleTitleChange = (event) => {    
    setNewTitle(event.target.value);
  }

  const handleAuthorChange = (event) => {    
    setNewAuthor(event.target.value);
  }

  const handleUrlChange = (event) => {    
    setNewUrl(event.target.value);
  }
  
  const handleMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
      setError(false)
    }, 7000)
  }

  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
        <Notification message={message} error={error}/>

        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor='Username'>Username </label>
            <input type="text" value={username} name="Username" id='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <label htmlFor='Password'>Password </label>
            <input type="password" value={password} name="Password" id='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>BlogList</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
      
      <Notification message={message} error={error}/>

      <h3>Add New Blog</h3>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor='Title'>Title: </label>
          <input id='Title' name='Title' value={newTitle} onChange={handleTitleChange} />
        </div>
        <div>
          <label>Author: </label>
          <input id='Author' name='Author' value={newAuthor} onChange={handleAuthorChange} />
        </div>
        <div>
          <label>Url: </label>
          <input id='Url' name='Url' value={newUrl} onChange={handleUrlChange} />
        </div>        
        <button type="submit">Save</button>
      </form>  

      <h3>Blogs</h3>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App