import Cookies from 'js-cookie';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db } from '../firebaseConfig';
import { doc, setDoc } from "firebase/firestore";

export const registerUser = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Simpan data pengguna di Firestore
    await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: email,
        registeredDate: Date.now()
    });

    Cookies.set('user', JSON.stringify(user), { expires: 1 });
    return user;
};

export const loginUser = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    Cookies.set('user', JSON.stringify(userCredential.user), { expires: 1 });
    return userCredential.user;
};

export const logoutUser = async () => {
    await auth.signOut();
    Cookies.remove('user');
};
