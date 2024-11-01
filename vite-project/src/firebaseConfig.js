import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCZhhMAFA83Jae0pe3CLYJRuP3SNkEPoAg",
    authDomain: "barkas-layo-64bac.firebaseapp.com",
    projectId: "barkas-layo-64bac",
    storageBucket: "barkas-layo-64bac.firebasestorage.app",
    messagingSenderId: "217595564781",
    appId: "1:217595564781:web:d57cea182cb92073fa32e4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };