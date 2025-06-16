import { useNotificationContext } from "@/contexts/NotificationContext";

const Notification = ()=> {
  const { notification } = useNotificationContext();

  return (
    <div className="rounded-sm">
      {notification ? (
        <p className={`${notification.status == 'error' ? 'bg-red-300' : 'bg-success'} text-red-950 rounded-md p-2 font-bold shadow-md`}>{notification.message}</p>
      ) : (
        <p>No notifications</p>
      )}
    </div>
  );
}

export default Notification;