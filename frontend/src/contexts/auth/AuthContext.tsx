import jwtDecode from 'jwt-decode';
import { User, UserCredential, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword } from 'firebase/auth';
import React, { SetStateAction, createContext, useContext, useEffect, useState } from 'react'
import { auth } from '~/firebase';
import { getNewTokens, verifyAccessToken } from '~/utils/cryptography';
import { backendBaseUrl } from '~/utils/variables.util';
import { useNavigate } from 'react-router-dom';


interface IAuthContext {
  user: any | null;
  setUser: SetStateAction<any | null>;
  registerUser: (email: string, password: string, confirmPassword: string) => Promise<any>;
  loginUser: (email: string, password: string) => Promise<any>;
  logoutUser: () => Promise<any>;
  resetUserPassword: (email: string) => Promise<any>;
  // updateUserEmail: (email: string) => Promise<any>;
  updateUserPassword: (newPassword: string, userId: string, resetToken: string,) => Promise<any>;
  // checkLoggedIn: () => Promise<boolean>;
}

export const AuthContext = createContext<IAuthContext | null>(null);


export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [email, setEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {

    const abortController = new AbortController();

    async function authenticateUser() {

      try {

        // const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoibGV3aWxsaWFtMDAwMUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTAxOTYzMDMsImV4cCI6MTY5MDE5NzIwM30.mz5lzM8wvwzNieK1LRtfL-2_Ex0ZkQMIPQ5aCPXR_jxRUzo5rhoQwxxJYlGC2IJOh7Vq5Hcmkr1CehKdGR49AkKQZLPVCsKaSQ0C-2i_KwyKjR_5qZACPespUcSCigdNxLq0nM_zEtx_2tOQS-5vYb--njLEhsGWOQHIy6igMxIaCi9a6uopQFIgF5ICK2AvPx30av7dEu3ICO-IHmkMuCTLUGPn7M2ROCChRvDd38cgmxcrBqGq_DvmqpzIa7c6hVol9BzDQ9AChucxShdcBF-f76hYctnW5hOBvC3zsx3j76lLJ2vhTr7WyssnNiYJZjpqypYuDjHFM6Vq3CcMeA';
        // const accessToken = '';

        const accessToken = localStorage.getItem('accessToken');
    
        if(!accessToken) {
          setUser(null);
          setLoading(false);
        }
    
        const payload = await verifyAccessToken(accessToken, abortController.signal);
  
        console.log({ payload });
        
        if(!payload) {
          setUser(null);
          setLoading(false);  
        } else {
          setUser(payload);
          setLoading(false);
        }

      } catch(error) {

        console.error(error);
      }

    }

    authenticateUser();

    return () => {
      abortController.abort();
    }

  }, []);


  const registerUser = async (email, password, confirmPassword) => {  

    const response = await fetch(new URL('auth/register', backendBaseUrl), {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        confirmPassword
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    return data;

  }

  const loginUser = async (email, password) => {

    const response = await fetch(new URL('auth/login', backendBaseUrl), {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    return data;

  }

  const logoutUser = () => {

    const accessToken = localStorage.getItem('accessToken');

    return fetch(new URL('auth/logout', backendBaseUrl), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
  }

  const resetUserPassword = (email) => {

    return fetch(new URL('auth/reset-password-email', backendBaseUrl), {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // return sendPasswordResetEmail(auth, email);
  }

  const updateUserEmail = (email) => {


    // if(user) {
    //   return updateEmail(user, email);
    // }
  }

  const updateUserPassword = (newPassword, userId, resetToken) => {

    console.log({ newPassword, userId, resetToken });
    
    return fetch(new URL('auth/reset-password', backendBaseUrl), {
      method: 'POST',
      body: JSON.stringify({ newPassword, userId, resetToken }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // if(user) {
    //   return updatePassword(user, password);
    // }
  }

  const value = {
    user,
    setUser,
    registerUser,
    loginUser,
    logoutUser,
    resetUserPassword,
    updateUserEmail,
    updateUserPassword,
  }

  return (
    <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
  )
}