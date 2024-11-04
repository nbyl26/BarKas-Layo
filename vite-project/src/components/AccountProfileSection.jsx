import React, { useEffect, useState } from 'react';
import { auth, db, storage } from '../firebaseConfig';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../assets/styles/AccountProfileSection.css';

function AccountProfileSection() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profileImage, setProfileImage] = useState('default-profile.png'); // Set default profile picture
    const [editMode, setEditMode] = useState(false);
    const [updatedData, setUpdatedData] = useState({
        name: '',
        phone: '',
        address: '',
        bio: ''
    });

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
                        setProfileImage(data.profilePicture || 'default-profile.png'); // Update with fetched image
                        setUpdatedData({ name: data.name, phone: data.phone, address: data.address, bio: data.bio });
                    } else {
                        setError('User data not found.');
                    }
                } else {
                    setError('User is not authenticated.');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}/${file.name}`);
            await uploadBytes(storageRef, file);
    
            const imageUrl = await getDownloadURL(storageRef);
            console.log('Uploaded image URL:', imageUrl); // Log URL gambar
    
            // Update state dan Firestore
            setProfileImage(imageUrl); // Update profil image di state
            const userRef = doc(db, 'users', auth.currentUser.uid);
            await updateDoc(userRef, { profilePicture: imageUrl });
        } else {
            console.error("File not found or not valid.");
        }
    };
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleUpdateProfile = async () => {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, updatedData);
        setUserData((prevData) => ({ ...prevData, ...updatedData }));
        setEditMode(false); // Exit edit mode
    };

    const handleDeleteAccount = async () => {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await deleteDoc(userRef);
        // Also delete the user from authentication
        await auth.currentUser.delete();
        // Redirect or show a message after deletion
        alert('Akun berhasil dihapus.');
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>Profil Pengguna</h1>
                <p>Selamat datang, {userData?.name || 'Pengguna'}</p>
            </div>
            <div className="profile-card">
                <div className="profile-picture">
                    <img src={profileImage} alt="Profile" />
                    {editMode && (
                        <input type="file" accept="image/*" onChange={handleImageUpload} />
                    )}
                </div>
                <div className="profile-info">
                    <h2>Informasi Akun</h2>
                    {editMode ? (
                        <>
                            <label>Nama:</label>
                            <input
                                type="text"
                                name="name"
                                value={updatedData.name}
                                onChange={handleInputChange}
                                placeholder="Masukkan nama"
                            />
                            <label>Nomor Telepon:</label>
                            <input
                                type="text"
                                name="phone"
                                value={updatedData.phone}
                                onChange={handleInputChange}
                                placeholder="Masukkan nomor telepon"
                            />
                            <label>Alamat:</label>
                            <input
                                type="text"
                                name="address"
                                value={updatedData.address}
                                onChange={handleInputChange}
                                placeholder="Masukkan alamat"
                            />
                            <label>Bio:</label>
                            <textarea
                                name="bio"
                                value={updatedData.bio}
                                onChange={handleInputChange}
                                placeholder="Masukkan bio"
                            />
                        </>
                    ) : (
                        <>
                            <p><strong>Nama:</strong> {userData?.name || 'Belum ditambahkan'}</p>
                            <p><strong>Email:</strong> {userData?.email || 'Belum ditambahkan'}</p>
                            <p><strong>Nomor Telepon:</strong> {userData?.phone || 'Belum ditambahkan'}</p>
                            <p><strong>Alamat:</strong> {userData?.address || 'Belum ditambahkan'}</p>
                            <p><strong>Bio:</strong> {userData?.bio || 'Belum ditambahkan'}</p>
                            <p><strong>Tanggal Bergabung:</strong> {userData?.registeredDate || 'Belum ditambahkan'}</p>
                        </>
                    )}
                </div>
            </div>
            <div className="profile-actions">
                {editMode ? (
                    <>
                        <button className="btn-edit" onClick={handleUpdateProfile}>Simpan Perubahan</button>
                        <button className="btn-delete" onClick={() => setEditMode(false)}>Batal</button>
                    </>
                ) : (
                    <>
                        <button className="btn-edit" onClick={() => setEditMode(true)}>Edit Profil</button>
                        <button className="btn-delete" onClick={handleDeleteAccount}>Hapus Akun</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default AccountProfileSection;
