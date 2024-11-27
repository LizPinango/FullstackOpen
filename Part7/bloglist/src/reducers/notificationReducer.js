import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  content: "",
  err: false,
};

const notificationSlice = createSlice({
  name: "notificaction",
  initialState,
  reducers: {
    setNoti(state, action) {
      return { ...initialState, content: action.payload };
    },
    resetNoti(state, action) {
      return { ...initialState, content: "" };
    },
    setErrorNoti(state, action) {
      return { content: action.payload, err: true };
    },
    resetErrorNoti(state, action) {
      return initialState;
    },
  },
});

export const { setNoti, resetNoti, setErrorNoti, resetErrorNoti } =
  notificationSlice.actions;

export const setNotification = (message, time) => {
  return (dispatch) => {
    dispatch(setNoti(message));
    setTimeout(() => {
      dispatch(resetNoti());
    }, time);
  };
};

export const setErrNotification = (message, time) => {
  return (dispatch) => {
    dispatch(setErrorNoti(message));
    setTimeout(() => {
      dispatch(resetErrorNoti());
    }, time);
  };
};

export default notificationSlice.reducer;
