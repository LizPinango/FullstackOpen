import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    //console.log(newBlog)

    createBlog(newBlog)

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
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

  return(
    <form onSubmit={addBlog}>
      <div>
        <label htmlFor='Title'>Title: </label>
        <input id='Title' name='Title' value={newTitle} onChange={handleTitleChange} placeholder='New Blog'/>
      </div>
      <div>
        <label>Author: </label>
        <input id='Author' name='Author' value={newAuthor} onChange={handleAuthorChange} placeholder='Jhon Doe'/>
      </div>
      <div>
        <label>Url: </label>
        <input id='Url' name='Url' value={newUrl} onChange={handleUrlChange} placeholder='https://www.webpage.com'/>
      </div>        
      <button type="submit">Save</button>
    </form> 
  )
}

export default BlogForm