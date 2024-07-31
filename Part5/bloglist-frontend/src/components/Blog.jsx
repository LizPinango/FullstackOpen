import { useState } from "react"

const Blog = ({ blog}) => { 
  const [visible, setVisible] = useState(false)  
  
  const showWhenVisible = { display: visible ? '' : 'none' }
  
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
        <p>{blog.likes} <button>like</button></p>
      </div>      
      <div className='blogInfoFooter' style={showWhenVisible}>
        {blog.user ? <p>save by {blog.user.username}</p> : <></>}
      </div>
    </div> 
  )   
}

export default Blog