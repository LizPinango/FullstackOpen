import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeUsers } from "../reducers/userReducer";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeUsers());
  }, []);

  return (
    <div>
      <h3>Users</h3>      
      <table>
        <tbody>
          <tr>
            <th>User</th>
            <th>Blogs</th>
          </tr>
          {users.map(user => (
            <tr>
              <th>{user.name}</th>
              <th>{user.blogs.length}</th>   
            </tr>                                
          ))}  
        </tbody>                  
      </table> 
    </div>
  )
}

export default Users;