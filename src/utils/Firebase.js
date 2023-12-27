// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDQ_6_6owm0Kjp0W-9kJskBNzbdiP07kU",
  authDomain: "netflixgpt-c2e9c.firebaseapp.com",
  projectId: "netflixgpt-c2e9c",
  storageBucket: "netflixgpt-c2e9c.appspot.com",
  messagingSenderId: "360561683353",
  appId: "1:360561683353:web:56667a54c7f04f53a44108",
  measurementId: "G-YY8FQ2CVQQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();