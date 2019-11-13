import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAZaVyOld9G2vomAlxTcVZjbCQeAcoTMAk",
  authDomain: "ecommerce-cloth.firebaseapp.com",
  databaseURL: "https://ecommerce-cloth.firebaseio.com",
  projectId: "ecommerce-cloth",
  storageBucket: "ecommerce-cloth.appspot.com",
  messagingSenderId: "662464619779",
  appId: "1:662464619779:web:3014e1d9198d04b3c17536",
  measurementId: "G-30X5G8E60T"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  'prompt': 'select_account'
});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
