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
  },
});

export const { setBlogs, appendBlog } = blogSlice.actions;

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

export default blogSlice.reducer;
