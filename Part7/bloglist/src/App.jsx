import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setNotification,
  setErrNotification,
} from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import BlogList from "./components/BlogList";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
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

  const likeBlog = async (blogObject) => {
    blogService
      .like(blogObject.id, blogObject)
      .then((returnedBlog) => {
        const oldBlog = blogs.filter((b) => b.id === returnedBlog.id);
        const newBlog = { ...oldBlog, likes: returnedBlog.likes };
        setBlogs(blogs.map((b) => (b.id !== newBlog.id ? b : newBlog)));
      })
      .catch((err) => {
        dispatch(setErrNotification(`${err.response.data.error}`, 7000));
      });
  };

  const deleteBlog = (id, blogTitle) => {
    if (window.confirm(`Do you want to delete the blog "${blogTitle}" ?`)) {
      blogService
        .remove(id)
        .then((res) => {
          setBlogs(blogs.filter((b) => b.id !== id));
          dispatch(
            setNotification(`the blog "${blogTitle}" was deleted`, 5000),
          );
        })
        .catch(() => {
          dispatch(
            setErrNotification(
              `the blog "${blogTitle}" could not be deleted`,
              7000,
            ),
          );
        });
    }
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

      <h3>Add New Blog</h3>
      <BlogForm />

      <h3>Blogs</h3>
      <BlogList
        increseLikes={likeBlog}
        loggedUser={user}
        removeBlog={deleteBlog}
      />
    </div>
  );
};

export default App;
