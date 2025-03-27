import { useParams} from 'react-router-dom'

const User = ({users}) => {
  const id = useParams().id  
  const user = users.find(u => u.id === id) 
  
  if (!user) {    
    return null  
  }

  return(
    <section id='user-section'>
      <h2>{user.name}</h2>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>      
    </section>
  )
}

export default User