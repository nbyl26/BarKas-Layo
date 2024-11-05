import Cookies from 'js-cookie';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db } from '../firebaseConfig';
import { doc, setDoc } from "firebase/firestore";
import { supabase } from '../supabaseClient'; 

export const registerUser = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Simpan data pengguna di Firestore
    await setDoc(doc(db, 'users', user.uid), {
      name: name,
      email: email,
      registeredDate: Date.now() 
  });

    Cookies.set('user', JSON.stringify(user), { expires: 1 }); // Cookie akan kedaluwarsa dalam 1 hari
    return user;
};

export const addProductToSupabase = async (productData, userId) => {
    const { name, description, category, condition, price, image } = productData;

    const { data, error } = await supabase
        .from('products') // Menggunakan tabel products
        .insert([{ 
            name: name,
            description: description,
            category: category,
            condition: condition,
            price: price,
            image: image,
            user_id: userId // Menyimpan UID pengguna di kolom user_id
        }]);

    // Tangani error jika penyimpanan ke Supabase gagal
    if (error) {
        console.error('Error adding product to Supabase:', error);
        throw new Error('Gagal menambahkan produk ke Supabase: ' + error.message);
    }

    return data; // Kembalikan data produk yang berhasil ditambahkan
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
