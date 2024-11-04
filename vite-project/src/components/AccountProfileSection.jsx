import React, { useEffect, useState } from 'react';
import { auth, db, storage } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import '../assets/styles/AccountProfileSection.css';

function AccountProfileSection() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        bio: '',
        profilePicture: ''
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
                        setUserData(data);
                        setFormData({
                            name: data.name || '',
                            phone: data.phone || '',
                            address: data.address || '',
                            bio: data.bio || '',
                            profilePicture: data.profilePicture || ''
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
            setUserData(formData);
            setIsEditing(false);
        } catch (error) {
            setError("Failed to update profile.");
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                null,
                (error) => setError("Failed to upload image."),
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    setFormData((prev) => ({ ...prev, profilePicture: downloadURL }));
                }
            );
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-image">
                    <img
                        src={formData.profilePicture || "https://via.placeholder.com/150"}
                        alt="Profile"
                        className="profile-picture"
                    />
                    {isEditing && (
                        <input type="file" accept="image/*" onChange={handleFileChange} className="file-input" />
                    )}
                </div>
                <div className="profile-info">
                    <h1 className="profile-name">{formData.name || 'Nama Pengguna'}</h1>
                    <p className="profile-bio">{formData.bio || 'Bio singkat pengguna belum diisi.'}</p>
                    <p className="profile-phone">{formData.phone || 'Nomor Telepon tidak tersedia'}</p>
                    <p className="profile-address">{formData.address || 'Alamat belum diisi'}</p>
                </div>
            </div>
            <div className="profile-actions">
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            placeholder="Nama"
                            onChange={handleInputChange}
                            className="input-field"
                        />
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            placeholder="Nomor Telepon"
                            onChange={handleInputChange}
                            className="input-field"
                        />
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            placeholder="Alamat"
                            onChange={handleInputChange}
                            className="input-field"
                        />
                        <textarea
                            name="bio"
                            value={formData.bio}
                            placeholder="Bio Singkat"
                            onChange={handleInputChange}
                            className="input-field bio-field"
                        ></textarea>
                        <button onClick={handleUpdateProfile} className="btn-save">Simpan</button>
                        <button onClick={handleEditToggle} className="btn-cancel">Batal</button>
                    </>
                ) : (
                    <button onClick={handleEditToggle} className="btn-edit">Edit Profil</button>
                )}
            </div>
        </div>
    );
}

export default AccountProfileSection;
