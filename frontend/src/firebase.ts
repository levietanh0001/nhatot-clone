// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "nhatot-clone.firebaseapp.com",
  projectId: "nhatot-clone",
  storageBucket: "nhatot-clone.appspot.com",
  messagingSenderId: "94473267843",
  appId: "1:94473267843:web:7a53c8c8516e79fd2dc9b6",
  measurementId: "G-E7FMDY95B0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();

const loginWithEmailAndPassword = (email, password, onSuccess, onError) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      onSuccess(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      
      onError(errorCode, errorMessage);
    });
};

export { auth, loginWithEmailAndPassword };
