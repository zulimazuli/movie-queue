import { IMovieQueueItem } from '../interfaces/MovieQueue';
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

export const getMovieQueueForUser = (uid: string) => {
  return firestore.collection('movieQueue').where('userId', '==', uid).get()
};

export const getMovieQueue = () => {
  return firestore
    .collection('movieQueue')
    .get()
    .then((snapshot) => {
      let arr: IMovieQueueItem[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        arr.push({
          id: doc.id,
          created: data['created'],
          userId: data['userId'],
          url: data['url'],
        });
      });
      return arr;
    })
    .catch(err => {
      console.error(err);
      return [];
    });
};

export const getUsers = () => {
  return firestore
    .collection('user')
    .get()
    .then((snapshot) => {
      // todo: wip
    }).catch(() => null);
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
