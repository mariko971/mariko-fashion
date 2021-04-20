import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDY80vrlRjSsvQeNzVFx-lHsTD9puVqDrQ",
    authDomain: "mariko-fashion-db.firebaseapp.com",
    projectId: "mariko-fashion-db",
    storageBucket: "mariko-fashion-db.appspot.com",
    messagingSenderId: "268975754843",
    appId: "1:268975754843:web:78bd020209dff0f4f8f97e"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = ()=> auth.signInWithPopup(provider);

  export default firebase;
