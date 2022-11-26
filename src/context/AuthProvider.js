import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../firebase/firebase.config';


export const AuthContext = createContext();

const provider = new GoogleAuthProvider();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const signUp = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const updateUser = (userInfo) => {
        // setLoading(true);
        return updateProfile(auth.currentUser, userInfo);
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }





    // for observing user 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            // console.log('user observing');
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [])


    const authInfo = {
        user,
        loading,
        signUp,
        signIn,
        googleSignIn,
        updateUser,
        logOut
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;