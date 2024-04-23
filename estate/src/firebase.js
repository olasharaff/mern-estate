// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-fcfd6.firebaseapp.com",
  projectId: "mern-estate-fcfd6",
  storageBucket: "mern-estate-fcfd6.appspot.com",
  messagingSenderId: "474170798724",
  appId: "1:474170798724:web:0b4af03137d1ced8a4c8d1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
