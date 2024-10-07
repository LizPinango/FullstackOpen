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
export default notificationSlice.reducer