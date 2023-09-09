import dayjs from 'dayjs';
import jwtDecode from 'jwt-decode';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUserProfile } from '~/api/user-profile.api';
import { IDecodedToken } from '~/interfaces/jwt.interface';
import { getNewTokens, verifyAccessToken } from '~/utils/cryptography.util';
import { backendBaseUrl } from '~/utils/variables.util';
import { IAuthContext } from './auth.context.interface';





export const AuthContext = createContext<IAuthContext | null>(null);


export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState<any | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  // const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [email, setEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {

    const abortController = new AbortController();

    async function authenticateUser() {

      try {

        const accessToken = localStorage.getItem('accessToken');
    
        if(!accessToken) {
          setUser(null);
          setLoading(false);
        }
    
        const payload = await verifyAccessToken(accessToken, abortController.signal);
        
        if(!payload) {

          const refreshToken = localStorage.getItem('refreshToken');
          console.log({ refreshToken });
          const newTokens = await getNewTokens(refreshToken, abortController.signal);

          if(!newTokens) {
            setUser(null);
            setLoading(false);
          }

          if(newTokens) {
            localStorage.setItem('accessToken', newTokens.accessToken);
            localStorage.setItem('refreshToken', newTokens.refreshToken);
            const payload = jwtDecode(newTokens.accessToken);
            setUser(payload);
            setLoading(false);
          }

        } else {
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

  const { 
    data: userProfileData, 
    isLoading: isUserProfileLoading
  } = useGetUserProfile(user?.userId, !!user?.userId);

  useEffect(() => {

    if(!isUserProfileLoading && userProfileData) {
      setUserProfile(userProfileData);
    }

  }, [isUserProfileLoading]);

  const getUserData = () => {
    return JSON.parse(String(localStorage.getItem('user')));
  }

  const checkLoggedIn = async () => {

    const accessToken = localStorage.getItem('accessToken');
    const payload = jwtDecode(String(accessToken)) as IDecodedToken;
    return !Boolean(dayjs.unix(Number(payload.exp)).diff(dayjs()) < 1);
  }

  const registerUser = async (email, password, confirmPassword, userName) => {  

    const response = await fetch(new URL('auth/register', backendBaseUrl), {
      method: 'POST',
      body: JSON.stringify({
        userName,
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
    
  }

  const updateUserEmail = (email) => {


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

  }

  const redirectToLoginPage = (loginUrl='/login') => {
    navigate(loginUrl);
  }

  const redirectToRegisterPage = (registerUrl='/register') => {
    navigate(registerUrl);
  }

  const value = {
    user,
    userProfile,
    setUser,
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