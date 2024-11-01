import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyD3uNTQb906KlO4SdSCvnuM8TXcrZYdAHo",
  authDomain: "auth-barkas-layo.firebaseapp.com",
  projectId: "auth-barkas-layo",
  storageBucket: "auth-barkas-layo.appspot.com",
  messagingSenderId: "95894465272",
  appId: "1:95894465272:web:56428dab9db5119c71690d",
  measurementId: "G-02JW74D3EG"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app); 

export { auth };
