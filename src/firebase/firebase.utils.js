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
    const collectionRef = firestore.collection('users');
    const snapShot = await userRef.get();
    const collectionSnapShot = await collectionRef.get();
    console.log({collection: collectionSnapShot.docs.map(doc => doc.data())})
    // console.log({collection: collectionSnapShot.docs})

    if (!snapShot.exists)
    {
      const {displayName,email} = userAuth;
      const createAt = new Date();
      try{
        await userRef.set({displayName:'Test User',
                            email:'randomEmail@gmail.com',
                            createAt,
                            ...additionalData});
      }catch(error){
        console.log("error creating user ",error.message);
      }
    }
    return userRef;
  }

export const addCollectionsAndDocuments = async (collectionKey, objectToAdd) =>
{
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef)
  const batch = firestore.batch();
  objectToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef,obj);
  });
  return await batch.commit();
}


firebase.initializeApp(config);

export const convertCollectionsSnapshotToMap = (collections) =>
{
    const transformedCollection = collections.docs.map(docSnapshot => {
      const {title,items} = docSnapshot.data();

      return {
        routeName:encodeURI(title.toLowerCase()),
        id: docSnapshot.id,
        title,
        items
      }
    })

    return transformedCollection.reduce((accumulator,collection) =>{
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    },{});
    // console.log(transformedCollection);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
