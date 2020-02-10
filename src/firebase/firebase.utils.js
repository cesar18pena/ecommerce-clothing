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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if(!snapShot.exists){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("TCL: createUserProfileDocument -> error", error)  
    }

  }

  console.log("TCL: createUserProfileDocument -> snapShot", snapShot);
  return userRef;

}

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const addCollectionAndItems = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
    console.log("TCL: addCollectionAndItems -> newDocRef", newDocRef)
  });

  return await batch.commit();
}

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  'prompt': 'select_account'
});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
