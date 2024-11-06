import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCZhhMAFA83Jae0pe3CLYJRuP3SNkEPoAg",
    authDomain: "barkas-layo-64bac.firebaseapp.com",
    projectId: "barkas-layo-64bac",
    storageBucket: "barkas-layo-64bac.firebasestorage.app",
    messagingSenderId: "217595564781",
    appId: "1:217595564781:web:d57cea182cb92073fa32e4",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
