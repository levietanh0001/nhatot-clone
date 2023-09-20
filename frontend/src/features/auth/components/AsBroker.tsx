import { Auth, User, getAuth } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '@/contexts/auth/Auth.context';
import { auth } from '@/firebase';



const AsBroker = ({ children, redirectPath='/login' }) => { // redirect to register as broker page

  const authContext = useContext(AuthContext);
  const user = authContext?.user as User;
  const [element, setElement] = useState<any | null>(null);

  if(!user) {
    return <Navigate to={redirectPath} replace />;
  }

  user
    .getIdTokenResult(true)
    .then(idTokenResult => {
      if(!!idTokenResult.claims.broker) {
        setElement(children ? children : <Outlet />)
      } else {
        setElement(<Navigate to={redirectPath} replace />);
      }
    })
    .catch(error => {
      setElement(<Navigate to={redirectPath} replace />);
      console.error(error);
    });
  
  return element;

}

export default AsBroker