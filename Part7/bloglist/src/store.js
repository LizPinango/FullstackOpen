import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";
import sesionReducer from "./reducers/sesionReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blog: blogReducer,
    loggedUser: sesionReducer,
    user: userReducer
  },
});

export default store;
