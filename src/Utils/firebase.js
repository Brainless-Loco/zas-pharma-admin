// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3-nf5kujsWJkBq8BVNpygccDt2eT6YWk",
  authDomain: "zas-pharma.firebaseapp.com",
  projectId: "zas-pharma",
  storageBucket: "zas-pharma.firebasestorage.app",
  messagingSenderId: "1011082956989",
  appId: "1:1011082956989:web:23a196924b77926478e7d4",
  measurementId: "G-E7K8HR8MR0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);