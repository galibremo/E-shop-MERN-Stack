// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "e-shop-6e21a.firebaseapp.com",
  projectId: "e-shop-6e21a",
  storageBucket: "e-shop-6e21a.appspot.com",
  messagingSenderId: "962237515997",
  appId: "1:962237515997:web:ef8a9aac0eeff36d603334",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
