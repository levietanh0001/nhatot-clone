import { User, UserCredential, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '~/firebase';


interface IAuthContext {
  user: User | null;
  registerUser: (email: string, password: string) => Promise<UserCredential>;
  loginUser: (email: string, password: string) => Promise<UserCredential>;
  checkIfUserExists: (email: string) => Promise<boolean>;
  logoutUser: () => Promise<void>;
  resetUserPassword: (email: string) => Promise<void>;
  updateUserEmail: (email: string) => Promise<void> | undefined;
  updateUserPassword: (password: string) => Promise<void> | undefined;
}

export const AuthContext = createContext<IAuthContext | null>(null);

// export const useAuth = () => {
//   return useContext(AuthContext);
// }

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // on mount, set current user
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

      setUser(currentUser);
      setLoading(false);
    
    })

    // on component unmount, unsubscribe user
    return () => unsubscribe();
  }, []);

  const registerUser = async (email, password) => {  
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user)
    return userCredential;
  }

  const checkIfUserExists = async (email) => {
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    if (signInMethods.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logoutUser = () => {
    return signOut(auth);
  }

  const resetUserPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  }

  const updateUserEmail = (email) => {
    if(user) {
      return updateEmail(user, email);
    }
  }

  const updateUserPassword = (password) => {
    if(user) {
      return updatePassword(user, password);
    }
  }

  const value = {
    user,
    registerUser,
    loginUser,
    logoutUser,
    resetUserPassword,
    updateUserEmail,
    updateUserPassword,
    checkIfUserExists
  }

  return (
    <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
  )
}