import { useNotificationContext } from '../contexts/NotificationContext';
import type { Status } from '../types/notification';

export const useTimedNotification = () => {
  const { notification, dispatchNotification } = useNotificationContext();

  const setTimedNotification = (
    message: string,
    status: Status,
    time = 3000
  ) => {
    dispatchNotification({ type: 'ADD_NOTIFICATION', payload: { message, status } });

    setTimeout(() => {
      dispatchNotification({ type: 'REMOVE_NOTIFICATION' });
    }, time);
  };

  return { notification, setTimedNotification };
};
