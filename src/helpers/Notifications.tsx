import { ReactNotificationOptions, store } from 'react-notifications-component';

const notificationBaseOptions: ReactNotificationOptions = {
  container: 'top-center',
  animationIn: ['animate__animated animate__fadeIn'],
  animationOut: ['animate__animated animate__fadeOut'],
  dismiss: {
    duration: 2500,
    showIcon: true,
  },
};

export const addSuccess = (message: string, title?: string) => {
  store.addNotification({
    title: title,
    message: message,
    type: 'success',
    ...notificationBaseOptions,
  });
};

export const addError = (message: string, title?: string) => {
  store.addNotification({
    title: title,
    message: message,
    type: 'danger',
    ...notificationBaseOptions,
  });
};

export const addInfo = (message: string, title?: string) => {
  store.addNotification({
    title: title,
    message: message,
    type: 'info',
    ...notificationBaseOptions,
  });
};
