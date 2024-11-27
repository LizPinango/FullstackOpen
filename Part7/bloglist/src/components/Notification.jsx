import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => {
    return state.notification;
  });

  if (notification.content === "") {
    return null;
  }

  return (
    <div className={notification.err ? "notification error" : "notification"}>
      {notification.content}
    </div>
  );
};

export default Notification;
