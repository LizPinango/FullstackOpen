import { useParams} from 'react-router-dom'

const User = ({users}) => {
  const id = useParams().id  
  const user = users.find(u => u.id === id) 
  
  if (!user) {    
    return null  
  }

  return(
    <div>
      <p>{user.name}</p>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>      
    </div>
  )
}

export default User