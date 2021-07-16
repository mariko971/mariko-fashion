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
        })
      } catch(error){
        console.log('error creating user', error.message);
      }
    }
    return userRef;
  }

  export const convertCollectionsSnapshotToMap = (collections)=>{
    const transformedCollections = collections.docs.map(doc=>{
      const { title, items } = doc.data();
      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      }
    });
    return transformedCollections.reduce((accumilator, collection)=>{
      accumilator[collection.title.toLowerCase()] = collection;
      return accumilator;
    }, {});
  };

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd)=>{
    const collectionRef= firestore.collection(collectionKey);
    const batch = firestore.batch();
    objectsToAdd.forEach(obj=>{
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef,obj)
    });
    return await batch.commit()
};

export const getCurrentUser = ()=>{
  return new Promise((resolve, reject)=>{
    const unsubscribe = auth.onAuthStateChanged(userAuth=>{
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = ()=> auth.signInWithPopup(googleProvider);

  export default firebase;
