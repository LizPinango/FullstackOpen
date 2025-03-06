import { createSlice } from "@reduxjs/toolkit";
import { setErrNotification, setNotification } from "./notificationReducer";
import loginService from "../services/login";
import blogService from "../services/blogs";

const sesionSlice = createSlice({
  name: "loggedUser",
  initialState: null, 
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = sesionSlice.actions;

export const initializeUser = () => {  
  return async (dispatch) => {
    const loggedUserJson = window.localStorage.getItem("loggedUser");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);      
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  };
}

export const login = (credentials) => {
  return async (dispatch) => {    
    try {
      const user = await loginService.login(credentials);
      blogService.setToken(user.token);
      dispatch(setUser(user))      
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      dispatch(setNotification(`${user.username} logged in`, 5000));
    } catch (err) {
      dispatch(setErrNotification(`${err.response.data.error}`, 7000));
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    dispatch(setUser(null));
    window.localStorage.removeItem("loggedUser");    
  }
}

export default sesionSlice.reducer;
