import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
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
const rtdb = firebase.database();

function setupPresence(user) {
    const idOfflineForRTDB = {
        state: 'offline',
        lastChanged: firebase.database.ServerValue.TIMESTAMP
    }

    const isOnlineForRTDB = {
        state: 'online',
        lastChanged: firebase.database.ServerValue.TIMESTAMP
    }

    const idOfflineForFirestore = {
        state: 'offline',
        lastChanged: firebase.firestore.FieldValue.serverTimestamp()
    };

    const isOnlineForFirestore = {
        state: 'online',
        lastChanged: firebase.firestore.FieldValue.serverTimestamp()
    };

    const rtdbRef = rtdb.ref(`/status/${user.uid}`)
    const userDoc = db.doc(`/users/${user.uid}`)

    rtdb.ref('.info/connected').on('value', async ( snapshot) => {
        if(snapshot.val() === false) {
            userDoc.update({status: idOfflineForFirestore})
            return;
        }

        await rtdbRef.onDisconnect().set(idOfflineForRTDB)
        rtdbRef.set(isOnlineForRTDB)
        userDoc.update({status: isOnlineForFirestore})
    })
}

export {db, firebase, setupPresence};
