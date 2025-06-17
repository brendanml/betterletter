import {
  createContext,
  useReducer,
  useContext,
} from 'react';

import type { Dispatch, ReactNode } from 'react';
import type {
  Notification,
  NotificationAction,
} from '../types/notification';

const notificationReducer = (
  state: Notification,
  action: NotificationAction
): Notification => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return action.payload;
    case 'REMOVE_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

type NotificationContextType = {
  notification: Notification;
  dispatchNotification: Dispatch<NotificationAction>;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined
);


// reactnode tells typescript that children can be any valid react element
export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, dispatchNotification] = useReducer(
    notificationReducer,
    null
  );

  return (
    <NotificationContext.Provider value={{ notification, dispatchNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotificationContext must be used within a NotificationProvider'
    );
  }
  return context;
};
