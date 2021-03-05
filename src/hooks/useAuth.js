import {useState, useEffect} from 'react';
import {db, firebase} from "../firebase";

export function useAuth() {
    const [user, setUser] = useState('loading')
    const [authError, setAuthError] = useState(null)

    useEffect(() => {
        return firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                const user = {
                    displayName: firebaseUser.displayName,
                    photoUrl: firebaseUser.photoURL,
                    uid: firebaseUser.uid
                };
                setUser(user)
                db.collection('users')
                    .doc(user.uid)
                    .set(user, {merge: true})
            } else {
                setUser(null)
            }
        })
    }, [])

    const handleSignIn = async () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        try {
            await firebase.auth().signInWithPopup(provider)
        } catch (err) {
            setAuthError(err)
        }
    }

    const handleSignOut = () => firebase.auth().signOut();

    return {
        user,
        authError,
        handleSignIn,
        handleSignOut
    }
}
