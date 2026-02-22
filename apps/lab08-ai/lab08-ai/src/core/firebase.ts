// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCM9wZUQmTzaI6lXS402vzAXEFHnk774is",
  authDomain: "lab06-expense-7d489.firebaseapp.com",
  projectId: "lab06-expense-7d489",
  storageBucket: "lab06-expense-7d489.firebasestorage.app",
  messagingSenderId: "580470325986",
  appId: "1:580470325986:web:e83d300449462514a1d4bb",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
