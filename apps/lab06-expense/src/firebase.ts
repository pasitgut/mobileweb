import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCM9wZUQmTzaI6lXS402vzAXEFHnk774is",
  authDomain: "lab06-expense-7d489.firebaseapp.com",
  projectId: "lab06-expense-7d489",
  storageBucket: "lab06-expense-7d489.firebasestorage.app",
  messagingSenderId: "580470325986",
  appId: "1:580470325986:web:8b87cbf41b29cea0a1d4bb",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
