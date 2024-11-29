import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import {
  setNotification,
  setErrNotification,
} from "./reducers/notificationReducer";
import BlogList from "./components/BlogList";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedUser");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("login: ", username, password);
    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      dispatch(setNotification(`${user.username} logged in`, 5000));
    } catch (err) {
      dispatch(setErrNotification(`${err.response.data.error}`, 7000));
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedUser");
    console.log("logged out");
  };

  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="Username">Username </label>
            <input
              type="text"
              value={username}
              name="Username"
              id="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <label htmlFor="Password">Password </label>
            <input
              type="password"
              value={password}
              name="Password"
              id="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>BlogList</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>Logout</button>
      </p>

      <Notification />
      <BlogForm />
      <BlogList loggedUser={user} />
    </div>
  );
};

export default App;
