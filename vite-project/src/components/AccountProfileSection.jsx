import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import '../assets/styles/AccountProfileSection.css';
import { useNavigate } from 'react-router-dom';

function AccountProfileSection() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        bio: ''
    });
    const navigate = useNavigate();

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
                        setFormData({
                            name: data.name || '',
                            phone: data.phone || '',
                            address: data.address || '',
                            bio: data.bio || ''
                        });
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

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateProfile = async () => {
        try {
            const userRef = doc(db, 'users', auth.currentUser.uid);
            await updateDoc(userRef, formData);
            setUserData((prev) => ({ ...prev, ...formData }));
            setIsEditing(false);
        } catch (error) {
            setError("Failed to update profile.");
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const userRef = doc(db, 'users', auth.currentUser.uid);
            await deleteDoc(userRef);
            await auth.currentUser.delete();
            alert("Account deleted successfully.");
            navigate('/');
        } catch (error) {
            setError("Failed to delete account.");
        }
    };

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
                <div className="profile-info">
                    <h2>Informasi Akun</h2>
                    {isEditing ? (
                        <>
                            <label>
                                Nama:
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Nomor Telepon:
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Alamat:
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Bio Singkat:
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <button onClick={handleUpdateProfile}>Simpan</button>
                            <button onClick={handleEditToggle}>Batal</button>
                        </>
                    ) : (
                        <>
                            <p><strong>Nama:</strong> {userData.name}</p>
                            <p><strong>Email:</strong> {userData.email}</p>
                            <p><strong>Nomor Telepon:</strong> {userData.phone || 'Belum diisi'}</p>
                            <p><strong>Alamat:</strong> {userData.address || 'Belum diisi'}</p>
                            <p><strong>Bio Singkat:</strong> {userData.bio || 'Belum diisi'}</p>
                            <p><strong>Tanggal Bergabung:</strong> {userData.registeredDate}</p>

                        </>
                    )}
                </div>
                <div className="profile-actions">
                    <button onClick={handleEditToggle} className="btn-edit">Edit Profil</button>
                    <button className="btn-delete" onClick={handleDeleteAccount}>Hapus Akun</button>
                </div>
            </div>
        </div>
    );
}

export default AccountProfileSection;
