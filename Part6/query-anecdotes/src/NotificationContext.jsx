import { createContext, useReducer } from "react"

const notiReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload
    case "RESET":
      return ''   
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificactionContextProvider = (props) => {
  const [noti, notiDispatch] = useReducer(notiReducer, '')

  return (
    <NotificationContext.Provider value={[noti, notiDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext