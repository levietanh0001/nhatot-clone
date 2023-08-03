import jwtDecode from 'jwt-decode';
import { User, UserCredential, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword } from 'firebase/auth';
import React, { SetStateAction, createContext, useContext, useEffect, useState } from 'react'
import { auth } from '~/firebase';
import { getNewTokens, verifyAccessToken } from '~/utils/cryptography';
import { backendBaseUrl } from '~/utils/variables.util';
import { useNavigate } from 'react-router-dom';
import { IDecodedToken } from '~/interfaces/jwt.interface';
import dayjs from 'dayjs';

interface IAuthContext {
  user: any | null;
  setUser: SetStateAction<any | null>;
  userData?: any | null;
  setUserData?: SetStateAction<any | null>;
  authenticated: boolean;
  setAuthenticated: React.Dispatch<SetStateAction<boolean>>;
  registerUser: (email: string, password: string, confirmPassword: string) => Promise<any>;
  loginUser: (email: string, password: string) => Promise<any>;
  logoutUser: () => Promise<any>;
  resetUserPassword: (email: string) => Promise<any>;
  // updateUserEmail: (email: string) => Promise<any>;
  updateUserPassword: (newPassword: string, userId: string, resetToken: string,) => Promise<any>;
  checkLoggedIn: () => Promise<boolean>;
  redirectToLoginPage: (loginUrl?: string) => void;
  redirectToRegisterPage: (registerUrl?: string) => void;
}



export const AuthContext = createContext<IAuthContext | null>(null);


export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState<any | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [email, setEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log({ authenticated });
  }, [authenticated]);

  useEffect(() => {

    const abortController = new AbortController();

    async function authenticateUser() {

      try {

        const accessToken = localStorage.getItem('accessToken');
    
        if(!accessToken) {
          setAuthenticated(false);
          setUser(null);
          setLoading(false);
        }
    
        const payload = await verifyAccessToken(accessToken, abortController.signal);
  
        console.log({ payload });
        
        if(!payload) {

          const refreshToken = localStorage.getItem('refreshToken');
          const newTokens = await getNewTokens(refreshToken, abortController.signal);

          if(!newTokens) {
            setAuthenticated(false);
            setUser(null);
            setLoading(false);
          }

          if(newTokens) {
            localStorage.setItem('accessToken', newTokens.accessToken);
            localStorage.setItem('refreshToken', newTokens.refreshToken);
            const payload = jwtDecode(newTokens.accessToken);
            setAuthenticated(true);
            setUser(payload);
            setLoading(false);
          }

        } else {
          setAuthenticated(true);
          setUser(payload);
          localStorage.setItem('user', JSON.stringify(user));
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

  const getUserData = () => {
    return JSON.parse(String(localStorage.getItem('user')));
  }

  const checkLoggedIn = async () => {

    const accessToken = localStorage.getItem('accessToken');
    const payload = jwtDecode(String(accessToken)) as IDecodedToken;
    return !Boolean(dayjs.unix(Number(payload.exp)).diff(dayjs()) < 1);
  }

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
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);

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

  const redirectToLoginPage = (loginUrl='/login') => {
    navigate(loginUrl);
  }

  const redirectToRegisterPage = (registerUrl='/register') => {
    navigate(registerUrl);
  }

  const value = {
    user,
    setUser,
    authenticated,
    setAuthenticated,
    registerUser,
    loginUser,
    logoutUser,
    resetUserPassword,
    updateUserEmail,
    updateUserPassword,
    redirectToLoginPage,
    redirectToRegisterPage,
    checkLoggedIn,
    getUserData
  }

  return (
    <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
  )
}