import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

import Notification from "./components/Notification";
import Home from "./components/Home";
import UsersList from "./components/UsersList";
import User from "./components/User"
import BlogDisplay from "./components/BlogDisplay";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser, login, logout } from "./reducers/sesionReducer";
import { initializeUsers } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);  
  const users = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
    dispatch(initializeUser())
  }, []);
 
  const handleLogin = async (event) => {
    event.preventDefault();

    const loginUser = {
      username: event.target.Username.value,
      password: event.target.Password.value    
    }   

    dispatch(login(loginUser))
  };

  const handleLogout = () => {
    dispatch(logout())
  };

  if (loggedUser === null) {
    return (
      <section id="login-section">
        <h2>Login</h2>
        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="Username">Username </label>
            <input type="text" name="Username" id="Username" />
          </div>
          <div>
            <label htmlFor="Password">Password </label>
            <input type="password" name="Password" id="Password" />
          </div>
          <button type="submit">Login</button>
        </form>
      </section>
    );
  }

  return (
    <Router>
      <nav>
        <div className="nav-element">
          <Link to="/" className='nav-link'>Home</Link>        
          <Link to="/users" className='nav-link'>Users</Link>   
        </div>
        <div className="nav-element"> 
          <p>{loggedUser.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>             
      </nav>
      <div className="header">
        <h1>BlogList</h1>
      </div>
      <main>             
        <Notification />

        <Routes>        
          <Route path="/users" element={<UsersList users={users}/>} />
          <Route path="/users/:id" element={<User users={users}/>}/>
          <Route path="/" element={<Home blogs={blogs} loggedUser={loggedUser}/>} />
          <Route path="/blogs/:id" element={<BlogDisplay blogs={blogs} loggedUser={loggedUser}/>} />
        </Routes>
      </main>
    </Router>   
  );
};

export default App;
