import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCygM556ZUUldq19kTPl_dtUKcLnZ-x6GE",
  authDomain: "facebook-messenger-clone-3b8e7.firebaseapp.com",
  projectId: "facebook-messenger-clone-3b8e7",
  storageBucket: "facebook-messenger-clone-3b8e7.appspot.com",
  messagingSenderId: "1084140305379",
  appId: "1:1084140305379:web:e6103786422e777752bed6",
  measurementId: "G-MYBRWPSFX6",
});

const db = firebaseApp.firestore();

export { db };
