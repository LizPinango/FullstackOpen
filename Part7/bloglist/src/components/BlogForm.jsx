import { useDispatch } from "react-redux";
import { useRef } from "react";
import { createBlog } from "../reducers/blogReducer";
import Togglable from "./Togglable";

const BlogForm = () => {
  const dispatch = useDispatch();

  const blogFormRef = useRef();

  const addBlog = async (event) => {
    blogFormRef.current.toggleVisibility();
    event.preventDefault();

    const newBlog = {
      title: event.target.Title.value,
      author: event.target.Author.value,
      url: event.target.Url.value,
    };

    event.target.Title.value = "";
    event.target.Author.value = "";
    event.target.Url.value = "";

    dispatch(createBlog(newBlog));
  };

  return (
    <Togglable buttonLabel="New Blog" ref={blogFormRef}>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="Title">Title: </label>
          <input id="Title" name="Title" placeholder="New Blog" />
        </div>
        <div>
          <label htmlFor="Author">Author: </label>
          <input id="Author" name="Author" placeholder="Jhon Doe" />
        </div>
        <div>
          <label htmlFor="Url">Url: </label>
          <input id="Url" name="Url" placeholder="https://www.webpage.com" />
        </div>
        <button type="submit">Save</button>
      </form>
    </Togglable>
  );
};

export default BlogForm;
