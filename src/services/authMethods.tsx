import { addSuccess } from '../helpers/Notifications';
import { auth } from './firebase';

export const authMethods = {
  signin: async (email: string, password: string) => {
    await auth.signInWithEmailAndPassword(email, password);
  },
  signout: () => {
    auth.signOut();
    addSuccess('Wylogowano');
  },
};
