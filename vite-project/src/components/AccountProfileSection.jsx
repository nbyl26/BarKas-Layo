import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import '../assets/styles/AccountProfileSection.css';

function AccountProfileSection() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userRef = doc(db, 'users', user.uid);
                    const userSnap = await getDoc(userRef);

                    if (userSnap.exists()) {
                        const data = userSnap.data();
                        const registeredDate = new Date(data.registeredDate).toLocaleDateString();
                        setUserData({ ...data, registeredDate }); 
                    } else {
                        setError('User data not found.');
                    }
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userData) {
        return <div>Data pengguna tidak ditemukan.</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>Profil Pengguna</h1>
                <p>Selamat datang, {userData.name}!</p>
            </div>
            <div className="profile-details">
                <div className="profile-picture">
                    {userData.profilePictureUrl ? (
                        <img src={userData.profilePictureUrl} alt="Foto Profil" />
                    ) : (
                        <div className="placeholder-picture">No Image</div>
                    )}
                </div>
                <div className="profile-info">
                    <h2>Informasi Akun</h2>
                    <p><strong>Nama:</strong> {userData.name}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Tanggal Bergabung:</strong> {userData.registeredDate}</p>
                </div>
                <div className="profile-actions">
                    <button className="btn-edit">Edit Profil</button>
                    <button className="btn-delete">Hapus Akun</button>
                </div>
            </div>
        </div>
    );
}

export default AccountProfileSection;
