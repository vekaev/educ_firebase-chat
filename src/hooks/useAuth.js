import React, {useState, useEffect} from 'react';
import {firebase} from "../firebase";

export function useAuth() {
    const [user, setUser] = useState('loading')
    const [authError, setAuthError] = useState(null)
    useEffect(() => {
        return firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser({
                    displayName: user.displayName,
                    photoUrl: user.photoURL,
                    uid: user.uid
                })
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
