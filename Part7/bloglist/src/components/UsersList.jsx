import { Link } from 'react-router-dom'

const UsersList = ({users}) => {
  return (
    <div>
      <h3>List of Users</h3>      
      <table>
        <tbody>
          <tr>
            <th>User</th>
            <th>Blogs</th>
          </tr>
          {users.map(user => (
            <tr key={user.id}>              
              <th>
                <Link to={`/users/${user.id}`}>{user.name}</Link>                
              </th>
              <th>{user.blogs.length}</th>   
            </tr>                                
          ))}  
        </tbody>                  
      </table> 
    </div>
  )
}

export default UsersList;