import Cookies from 'js-cookie';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db } from '../firebaseConfig';
import { doc, setDoc, collection, addDoc } from "firebase/firestore";

// Fungsi untuk mendaftarkan pengguna baru
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

// Fungsi untuk menambahkan produk ke Firestore
export const addProductToFirestore = async (productData, userId) => {
    const { name, description, category, condition, price, image } = productData;

    try {
        const docRef = await addDoc(collection(db, 'products'), {
            name: name,
            description: description,
            category: category,
            condition: condition,
            price: price,
            image: image,
            user_id: userId // Simpan UID pengguna
        });
        
        return docRef.id; // Mengembalikan ID dokumen produk yang berhasil ditambahkan
    } catch (error) {
        console.error('Error adding product to Firestore:', error);
        throw new Error('Gagal menambahkan produk ke Firestore: ' + error.message);
    }
};

// Fungsi untuk login pengguna
export const loginUser = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    Cookies.set('user', JSON.stringify(userCredential.user), { expires: 1 }); // Cookie akan kedaluwarsa dalam 1 hari
    return userCredential.user;
};

// Fungsi untuk logout pengguna
export const logoutUser = async () => {
    await auth.signOut();
    Cookies.remove('user');
};
