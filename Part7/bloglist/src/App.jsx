import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser, login, logout } from "./reducers/sesionReducer";
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

import Notification from "./components/Notification";
import Home from "./components/Home";
import Users from "./components/Users";

const App = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
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
      <div>
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
      </div>
    );
  }

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>        
        <Link to="/users">Users</Link>        
      </nav>

      <h2>BlogList</h2>
      <p>
        {loggedUser.name} logged in <button onClick={handleLogout}>Logout</button>
      </p>
      <Notification />

      <Routes>        
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Home loggedUser={loggedUser}/>} />
      </Routes>
     
    </Router>   
  );
};

export default App;
