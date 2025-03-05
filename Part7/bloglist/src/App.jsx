import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser, login, logout } from "./reducers/userReducer";
import BlogList from "./components/BlogList";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

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

  if (user === null) {
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
