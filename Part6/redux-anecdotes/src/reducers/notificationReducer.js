import { createSlice } from '@reduxjs/toolkit'

const initialState = 'Bienvenido'

const notificationSlice = createSlice({
  name: 'notificaction',
  initialState,
  reducers: {
    setNoti(state, action){
      return action.payload
    },
    resetNoti(state, action){
      return ''
    }
  }
})

export const { setNoti, resetNoti } = notificationSlice.actions

export const setNotification = (message, time) => {
  return dispatch => {
    dispatch(setNoti(message))
    setTimeout(() => {
      dispatch(resetNoti())
    }, time)
  }
}

export default notificationSlice.reducer