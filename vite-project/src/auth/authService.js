import Cookies from 'js-cookie';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db } from '../firebaseConfig';
import { doc, setDoc, getDoc } from "firebase/firestore";

// Fungsi Register User
export const registerUser = async (email, password, name) => {
    // Register dengan Firebase
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Menyimpan data user di Firestore
    await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: email,
        registeredDate: Date.now()
    });

    // Simpan data user dan nama di cookie
    Cookies.set('user', JSON.stringify({ uid: user.uid, email: user.email, name }), { expires: 1 });
    return user;
};

// Fungsi Login User
export const loginUser = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Ambil data user dari Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData = userDoc.exists() ? userDoc.data() : {};

    // Simpan data user dan nama di cookie
    Cookies.set('user', JSON.stringify({ uid: user.uid, email: user.email, name: userData.name }), { expires: 1 });
    return user;
};

// Fungsi Logout User
export const logoutUser = async () => {
    await auth.signOut();
    Cookies.remove('user');
};
