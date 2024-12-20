import { auth, db } from '../../firebaseConfig';
import { collection, doc, getDocs, getDoc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export const getAllUsers = async () => {
    try {
        const usersCollection = collection(db, 'users');
        const userSnapshot = await getDocs(usersCollection);
        return userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (err) {
        console.error("Unexpected error fetching users:", err);
        return null;
    }
};

export const getUserById = async (id) => {
    try {
        const userDoc = doc(db, 'users', id);
        const userSnapshot = await getDoc(userDoc);

        if (userSnapshot.exists()) {
            return { id: userSnapshot.id, ...userSnapshot.data() };
        } else {
            console.error("User not found");
            return null;
        }
    } catch (err) {
        console.error("Unexpected error fetching user by ID:", err);
        return null;
    }
};


export const loginUserByEmailAndPassword = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error logging in:", error);
        return null;
    }
};

// Registrasi pengguna baru dengan email dan password menggunakan Firebase
export const registerUserByEmailAndPassword = async (email, password, name) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Simpan data pengguna di Firestore setelah registrasi
        await setDoc(doc(db, 'users', user.uid), {
            name: name,
            email: email,
            registeredDate: Date.now()
        });

        return user;
    } catch (error) {
        console.error("Error registering user:", error);
        return null;
    }
};
