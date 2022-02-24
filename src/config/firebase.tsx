
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyDoLplQaTCJ-qhj9-KiqvQOCRTRGUimxBQ",
    authDomain: "react-form-402a8.firebaseapp.com",
    projectId: "react-form-402a8",
    storageBucket: "react-form-402a8.appspot.com",
    messagingSenderId: "482602207844",
    appId: "1:482602207844:web:e0d81aef5d0e3924196d71",
    measurementId: "G-M190LJ386F"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);