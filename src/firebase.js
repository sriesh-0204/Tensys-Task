// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC96g2oyG1Qe45dv0p9e4-YYMeKvt_y9C4",
  authDomain: "react-auth-login-aaeee.firebaseapp.com",
  projectId: "react-auth-login-aaeee",
  storageBucket: "react-auth-login-aaeee.appspot.com",
  messagingSenderId: "1003945859094",
  appId: "1:1003945859094:web:2c859bab54459610563d37",
  measurementId: "G-G6G7XDMT3G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
