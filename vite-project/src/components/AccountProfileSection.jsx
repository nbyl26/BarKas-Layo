import React, { useEffect, useState } from 'react';
import { auth, db} from '../firebaseConfig';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/AccountProfileSection.css';

function AccountProfileSection() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profileImage, setProfileImage] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        bio: ''
    });
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (!user) {
                navigate('/login');
                return;
            }

            try {
                const userRef = doc(db, 'users', user.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    const data = userSnap.data();
                    setUserData(data);
                    setProfileImage(data.profilePicture || '');
                    setFormData({
                        name: data.name,
                        email: data.email,
                        phone: data.phone || '',
                        address: data.address || '',
                        bio: data.bio || ''
                    });
                    localStorage.setItem('userData', JSON.stringify(data));
                } else {
                    setError('User data not found.');
                    navigate('/login');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        });

        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const data = JSON.parse(storedUserData);
            setUserData(data);
            setProfileImage(data.profilePicture || '');
            setFormData({
                name: data.name,
                email: data.email,
                phone: data.phone || '',
                address: data.address || '',
                bio: data.bio || ''
            });
            setLoading(false);
        }

        return () => unsubscribe();
    }, [navigate]);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}/${file.name}`);
            await uploadBytes(storageRef, file);

            const imageUrl = await getDownloadURL(storageRef);
            setProfileImage(imageUrl);
            const userRef = doc(db, 'users', auth.currentUser.uid);
            await updateDoc(userRef, { profilePicture: imageUrl });
        }
    };

    const handleEditToggle = () => {
        if (editMode) {
            handleUpdateProfile(); // Panggil untuk menyimpan perubahan saat keluar dari edit mode
        }
        setEditMode(!editMode);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdateProfile = async () => {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, {
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
            bio: formData.bio
        });
        setEditMode(false); // Keluar dari mode edit setelah menyimpan perubahan
    };

    const handleDeleteAccount = async () => {
        try {
            const userRef = doc(db, 'users', auth.currentUser.uid);
            await deleteDoc(userRef);
            await auth.currentUser.delete();
            navigate('/login'); 
        } catch (error) {
            console.error("Error deleting account:", error);
        }
    };

    const confirmDeleteAccount = () => {
        setShowDeleteConfirmation(true);
    };

    const cancelDeleteAccount = () => {
        setShowDeleteConfirmation(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1><span>Profil</span> Pengguna </h1>
                <p>Selamat datang, <span>{userData.name}</span>!</p>
            </div>
            <div className="profile-picture">
                {profileImage ? (
                    <img src={profileImage} alt="Profile" />
                ) : (
                    <div className="placeholder-picture">Tidak ada gambar</div>
                )}
                {editMode && (
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                )}
            </div>
            <div className="profile-details">
                <h2><span>Informasi </span>Akun</h2>
                <div className="profile-info">
                    <div className="info-item">
                        <label>Nama:</label>
                        {editMode ? (
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <p>{userData.name}</p>
                        )}
                    </div>
                    <div className="info-item">
                        <label>Email:</label>
                        <p>{userData.email}</p>
                    </div>
                    <div className="info-item">
                        <label>Telepon:</label>
                        {editMode ? (
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <p>{formData.phone}</p>
                        )}
                    </div>
                    <div className="info-item">
                        <label>Alamat:</label>
                        {editMode ? (
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <p>{formData.address}</p>
                        )}
                    </div>
                    <div className="info-item">
                        <label>Bio:</label>
                        {editMode ? (
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <p>{formData.bio}</p>
                        )}
                    </div>
                </div>
                <div className="profile-actions">
                    <button onClick={handleEditToggle} className="btn-edit">
                        {editMode ? 'Simpan Perubahan' : 'Edit Profil'}
                    </button>
                    <button onClick={confirmDeleteAccount} className="btn-delete">
                        Hapus Akun
                    </button>
                </div>
                {showDeleteConfirmation && (
                    <div className="confirmation-dialog">
                        <p>Apakah Anda yakin ingin menghapus akun Anda?</p>
                        <button onClick={handleDeleteAccount} className="btn-confirm">
                            Ya, hapus akun
                        </button>
                        <button onClick={cancelDeleteAccount} className="btn-cancel">
                            Batal
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AccountProfileSection;
