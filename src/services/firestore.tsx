import { firestore } from './firebase';

export const addMovieLink = (link: string, uid: string) => {
  return firestore.collection('movieQueue').add({
    created: Date.now(),
    url: link,
    userId: uid,
  });
};

export const removeMovieLink = async (id: string) => {
  return await firestore.collection('movieQueue').doc(id).delete();
};

export const getMovieQueue = (uid: string) => {
  return firestore.collection('movieQueue').where('userId', '==', uid).get();
};
