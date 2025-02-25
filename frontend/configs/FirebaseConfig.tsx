// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFNyxWoEUcbnFUAPhO_dZonZR3qUsbQsc",
  authDomain: "workout-tracker-ai.firebaseapp.com",
  projectId: "workout-tracker-ai",
  storageBucket: "workout-tracker-ai.firebasestorage.app",
  messagingSenderId: "706170865823",
  appId: "1:706170865823:web:c5660e8745497af0debaaa",
  measurementId: "G-KTRLWSWCLG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
//const analytics = getAnalytics(app);
