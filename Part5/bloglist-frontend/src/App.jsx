import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)    
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  const blogFormRef = useRef()

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

  const addBlog = async (blogObject) => {   
    blogFormRef.current.toggleVisibility() 
    blogService
      .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))          
          handleMessage(`a new blog '${returnedBlog.title}' by ${returnedBlog.author} added`)
        })
        .catch(err => {
          console.log(err);         
          setError(true);
          handleMessage(err.response.data.error)
        })
  }
    
  const likeBlog = async (blogObject) => {
    blogService
      .like(blogObject.id, blogObject)
        .then(returnedBlog => {             
          const oldBlog = blogs.filter(b => b.id === returnedBlog.id)
          const newBlog = {...oldBlog, likes: returnedBlog.likes}
          setBlogs(blogs.map(b => b.id !== newBlog.id ? b : newBlog))
        })
        .catch(err => {
          console.log(err);         
          setError(true);
          handleMessage(err.response.data.error)
        })
  }

  const deleteBlog = (id, blogTitle) => {
    if (window.confirm(`Do you want to delete the blog "${blogTitle}" ?`)){
      blogService
        .remove(id)
          .then(res => {
            console.log(`deleted blog with id ${id}`)   
            console.log(res)       
            setBlogs(blogs.filter(b => b.id !== id))
            handleMessage(`the blog "${blogTitle}" was deleted`)
          })
          .catch(() => {
            setError(true);
            handleMessage(`the blog "${blogTitle}" could not be deleted`)
          })
    }
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
      <Togglable buttonLabel='New Blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog}/>
      </Togglable>
      
      <h3>Blogs</h3>      
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>        
        <Blog key={blog.id} blog={blog} increseLikes={likeBlog} loggedUser={user} removeBlog={deleteBlog}/>
      )}
    </div>
  )
}

export default App