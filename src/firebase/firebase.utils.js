import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyCUcW6iK5CE5aJ91gq1KPxJgwbE98JzgjQ",
    authDomain: "crwn-db-c6bff.firebaseapp.com",
    projectId: "crwn-db-c6bff",
    storageBucket: "crwn-db-c6bff.appspot.com",
    messagingSenderId: "1078517972246",
    appId: "1:1078517972246:web:88878ae61d9de210452437",
    measurementId: "G-EQPP2JLW9K"
  }

  export const createUserProfieDocument = async(userAuth,additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    
    if (!snapShot.exists)
    {
      const {displayName,email} = userAuth;
      const createAt = new Date();
      try{
        await userRef.set({displayName,
                            email,
                            createAt,
                            ...additionalData});
      }catch(errp){
        console.log("error creating user ",errp.message);
      }
    }
    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();


  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;