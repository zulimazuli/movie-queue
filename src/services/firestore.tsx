import { User } from '../interfaces/User';
import { firestore } from './firebase';

export const addMovieLink = async (url: string, userId: string) => {
  return await firestore.collection('movieQueue').add({
    created: Date.now(),
    url: url,
    userId: userId,
  });
};

export const removeMovieLink = async (id: string) => {
  return await firestore.collection('movieQueue').doc(id).delete();
};

export const getMovieQueue = (uid: string) => {
  return firestore.collection('movieQueue').where('userId', '==', uid).get();
};

export const getUserRole = (uid: string) => {
  return firestore
    .collection('user')
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.data()) {
        return (doc.data() as User).role;
      } else {
        return 'user';
      }
    }).catch(() => 'user');
};
