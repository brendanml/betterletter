export type Status = 'success' | 'error';

export type Notification = {
  message: string;
  status: Status;
} | null;

export type NotificationAction =
  | { type: 'ADD_NOTIFICATION'; payload: { message: string; status: Status } }
| { type: 'REMOVE_NOTIFICATION' };