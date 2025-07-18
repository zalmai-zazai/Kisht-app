import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBfIf-3SYnGNb24EQ5HP3o6POkRqvSZGYg",
  authDomain: "kisht-app-5d427.firebaseapp.com",
  projectId: "kisht-app-5d427",
  storageBucket: "kisht-app-5d427.firebasestorage.app",
  messagingSenderId: "315876355192",
  appId: "1:315876355192:web:3409e39ffe9fa6539dd18d",
  measurementId: "G-G480EXL66Q",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
