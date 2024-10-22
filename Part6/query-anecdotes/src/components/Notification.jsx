import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const Notification = () => {

  const [noti] = useContext(NotificationContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (noti === '') return null

  return (
    <div style={style}>
      {noti}
    </div>
  )
}

export default Notification
