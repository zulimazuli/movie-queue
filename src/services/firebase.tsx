import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

if (
  process.env.NODE_ENV !== 'production' &&
  window.location.hostname === 'localhost'
) {
  firestore.useEmulator(
    'localhost',
    Number(process.env.REACT_APP_FIREBASE_EMULATOR_FIRESTORE_PORT)
  );
  auth.useEmulator(
    'http://localhost:' + process.env.REACT_APP_FIREBASE_EMULATOR_AUTH_PORT
  );

  console.log('Running on local Firebase Emulator...');
}
