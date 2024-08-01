import { useEffect, useState } from "react"

const Blog = ({ blog, increseLikes }) => { 
  const [visible, setVisible] = useState(false)  
  const [likes, setLikes] = useState(blog.likes) //NUEVO
  
  const showWhenVisible = { display: visible ? '' : 'none' }
  
  const handleLike = () => {
    const updatedLikes = likes + 1    
    setLikes(updatedLikes)   
    const updatedBlog = {...blog, likes: updatedLikes}    
    increseLikes(updatedBlog)
  }
  
  return (
    <div className='blogInfo'>
      <div className='blogInfoHeader'>
        <p><b>{blog.title}</b> by {blog.author}</p> 
        <button className='btnShowMore' onClick={() => setVisible(!visible)}>
          {visible ? 'Show Less' : 'Show More' }
        </button>
      </div>      
      <div className='blogInfoBody' style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>{likes} <button onClick={handleLike}>like</button></p>
      </div>      
      <div className='blogInfoFooter' style={showWhenVisible}>
        {blog.user ? <p>save by {blog.user.username}</p> : <></>}
      </div>
    </div> 
  )   
}

export default Blog