import Cookies from 'js-cookie';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db } from '../firebaseConfig';
import { doc, setDoc } from "firebase/firestore";
import { supabase } from '../supabaseClient'; // Impor Supabase

export const registerUser = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Simpan data pengguna di Firestore
    await setDoc(doc(db, 'users', user.uid), {
      name: name,
      email: email,
      registeredDate: Date.now() 
    });

    const { data, error } = await supabase
        .from('users') 
        .insert([{ 
            id: user.uid, // Gunakan uid dari Firebase sebagai id
            name: name, 
            email: email,
            registered_date: new Date() // Simpan tanggal registrasi
        }]);

    if (error) {
        console.error('Error saving user to Supabase:', error);
        throw new Error('Gagal menyimpan pengguna ke Supabase: ' + error.message);
    }

    Cookies.set('user', JSON.stringify(user), { expires: 1 }); // Cookie akan kedaluwarsa dalam 1 hari
    return user;
};

export const loginUser = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    Cookies.set('user', JSON.stringify(userCredential.user), { expires: 1 }); // Cookie akan kedaluwarsa dalam 1 hari
    return userCredential.user;
};

export const logoutUser = async () => {
    await auth.signOut();
    Cookies.remove('user');
};
