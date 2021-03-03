import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBLGOTrGUDDnhJQYTMdQFzrQ9B4-6W1Jtw",
    authDomain: "educ-firebase-chat.firebaseapp.com",
    databaseURL: "https://educ-firebase-chat-default-rtdb.firebaseio.com",
    projectId: "educ-firebase-chat",
    storageBucket: "educ-firebase-chat.appspot.com",
    messagingSenderId: "1049431680163",
    appId: "1:1049431680163:web:8720adf8a3693deaaf0b16"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = firebase.firestore()

export {db, firebase};
