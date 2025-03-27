import { Link } from 'react-router-dom'

const UsersList = ({users}) => {
  return (
    <section id='users-list-section'>
      <h2>List of Users</h2>      
      <table id='users-table'>
        <tbody>
          <tr>
            <th><h3>User</h3></th>
            <th><h3>Blogs</h3></th>
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
    </section>
  )
}

export default UsersList;