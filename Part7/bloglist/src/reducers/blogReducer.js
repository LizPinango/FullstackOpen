import { createSlice } from "@reduxjs/toolkit";
import { setErrNotification, setNotification } from "./notificationReducer";
import blogServices from "../services/blogs";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    likeBlog(state, action) {
      const id = action.payload;
      const blogToChange = state.find((b) => b.id === id);
      const changedBlog = { ...blogToChange, likes: blogToChange.likes + 1 };
      return state.map((b) => (b.id !== id ? b : changedBlog));
    },
    deleteBlog(state, action) {
      const id = action.payload;
      return state.filter((b) => b.id !== id);
    },
  },
});

export const { setBlogs, appendBlog, likeBlog, deleteBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogServices.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogServices.create(blogObject);
      dispatch(appendBlog(newBlog));
      dispatch(
        setNotification(
          `Blog '${newBlog.title}' by ${newBlog.author} added to datebase`,
          5000,
        ),
      );
    } catch (err) {
      dispatch(setErrNotification(`${err.response.data.error}`, 7000));
    }
  };
};

export const likeOneBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const likedBlog = await blogServices.like(blogObject.id, {
        ...blogObject,
        likes: blogObject.likes + 1,
      });
      dispatch(likeBlog(likedBlog.id));
    } catch (err) {
      dispatch(setErrNotification(`${err.response.data.error}`, 7000));
    }
  };
};

export const deleteOneBlog = (blogID, blogTitle) => {
  if (window.confirm(`Do you want to delete the blog "${blogTitle}" ?`)) {
    return async (dispatch) => {
      try {
        await blogServices.remove(blogID);
        dispatch(deleteBlog(blogID));
        dispatch(setNotification(`the blog "${blogTitle}" was deleted`, 5000));
      } catch (err) {
        dispatch(
          setErrNotification(
            `the blog "${blogTitle}" could not be deleted`,
            7000,
          ),
        );
      }
    };
  }
};

export default blogSlice.reducer;
