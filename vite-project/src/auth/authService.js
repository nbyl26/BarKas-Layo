import Cookies from 'js-cookie';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db } from '../firebaseConfig';
import { doc, setDoc } from "firebase/firestore";

// Fungsi untuk registrasi pengguna
export const registerUser = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Simpan data pengguna di Firestore
    await setDoc(doc(db, 'users', user.uid), {
      name: name,
      email: email,
      registeredDate: Date.now() 
  });

    // Simpan status login di cookie
    Cookies.set('user', JSON.stringify(user), { expires: 1 }); // Cookie akan kedaluwarsa dalam 1 hari
    return user;
};

// Fungsi untuk login pengguna
export const loginUser = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Simpan status login di cookie
    Cookies.set('user', JSON.stringify(userCredential.user), { expires: 1 }); // Cookie akan kedaluwarsa dalam 1 hari
    return userCredential.user;
};

// Fungsi untuk logout pengguna
export const logoutUser = async () => {
    await auth.signOut();
    // Hapus cookie saat logout
    Cookies.remove('user');
};
