// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-dc648.firebaseapp.com",
  projectId: "mern-estate-dc648",
  storageBucket: "mern-estate-dc648.appspot.com",
  messagingSenderId: "319082430876",
  appId: "1:319082430876:web:03d2b77a63aeb8c736c859"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);