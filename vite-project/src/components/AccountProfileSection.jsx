// AccountProfileSection.jsx
import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function AccountProfileSection() {
    const [displayName, setDisplayName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(firestore, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setDisplayName(docSnap.data().displayName || '');
                    setPhoneNumber(docSnap.data().phoneNumber || '');
                }
            }
        };
        fetchUserData();
    }, []);

    const handleSave = async () => {
        const user = auth.currentUser;
        if (user) {
            const docRef = doc(firestore, 'users', user.uid);
            await updateDoc(docRef, {
                displayName,
                phoneNumber
            });
            alert('Perubahan profil berhasil disimpan!');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Nama"
            />
            <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Nomor Telepon"
            />
            <button onClick={handleSave}>Simpan Perubahan</button>
        </div>
    );
}

export default AccountProfileSection;
