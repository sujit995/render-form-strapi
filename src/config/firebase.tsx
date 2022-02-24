
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyAU8Np90_NtRLQNdgF1-DTrzyOhwBWMvM4",
  authDomain: "render-form-2ac1f.firebaseapp.com",
  projectId: "render-form-2ac1f",
  storageBucket: "render-form-2ac1f.appspot.com",
  messagingSenderId: "767805040277",
  appId: "1:767805040277:web:921ba72768f7623e039d9c",
  measurementId: "G-TYSD83TVPW"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);