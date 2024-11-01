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
    email: user.email,
    name: name,
  });

  return user;
};

// Fungsi untuk login pengguna
export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};
