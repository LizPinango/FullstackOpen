import { createSlice } from "@reduxjs/toolkit";
import { setErrNotification, setNotification } from "./notificationReducer";
import userServices from "../services/user"

const userSlice = createSlice({
  name: "user",
  initialState: [], 
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
    appendUser(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setUsers } = userSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userServices.getAll();
    dispatch(setUsers(users));
  };
};

export const createUser = (userObject) => {
  return async (dispatch) => {
    try {
      const newUser = await userServices.create(userObject);
      dispatch(appendUser(newUser));
      dispatch(
        setNotification(
          `New user '${newUser.name}' with username: ${newUser.username} added to datebase`,
          5000,
        ),
      );
    } catch (err) {
      dispatch(setErrNotification(`${err.response.data.error}`, 7000));
    }
  };
};

export default userSlice.reducer;