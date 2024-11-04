import React, { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig'; // Import Firestore configuration
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore methods
import '../assets/styles/JualBarangSection.css';

function JualBarangSection() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [price, setPrice] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (!currentUser) {
                alert('Silakan login terlebih dahulu untuk mengakses halaman ini.');
                navigate('/login');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!gambar) {
            alert("Silakan unggah gambar");
            return;
        }

        const storageRef = ref(storage, `images/${gambar.name}`);
        await uploadBytes(storageRef, gambar);
        const urlGambar = await getDownloadURL(storageRef);

        try {
            await addDoc(collection(db, 'barang'), {
                nama,
                deskripsi,
                kategori,
                kondisi,
                harga,
                urlGambar,
            });
            alert("Barang berhasil diunggah!");
        } catch (error) {
            console.error("Error adding document: ", error);
        }

        // Reset form
        setNama('');
        setDeskripsi('');
        setKategori('');
        setKondisi('');
        setHarga('');
        setGambar(null);
    };

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'barang'), (snapshot) => {
            const daftarBarang = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setBarang(daftarBarang);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const imageInput = document.getElementById('product-image');
        const handleImageUpload = (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const imgPreview = document.createElement('img');
                    imgPreview.src = e.target.result;
                    imgPreview.style.maxWidth = '100%';
                    imgPreview.style.marginTop = '1rem';
                    document.querySelector('.sell-form').appendChild(imgPreview);
                };
                reader.readAsDataURL(file);
            }
        };

        if (imageInput) {
            imageInput.addEventListener('change', handleImageUpload);
        }

        return () => {
            if (imageInput) {
                imageInput.removeEventListener('change', handleImageUpload);
            }
        };
    }, []);


    return (
        <section className="sell-form-section">
            <div className="container">
                <h2><span>Jual</span> Barang</h2>
                <form onSubmit={handleSubmit} method="POST" className="sell-form">
                    <div className="form-group">
                        <label htmlFor="product-name">Nama Barang</label>
                        <input type="text" id="product-name" name="product-name" placeholder="Masukkan nama barang" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="product-description">Deskripsi Barang</label>
                        <textarea id="product-description" name="product-description" rows="5" placeholder="Masukkan deskripsi barang" required></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Kategori</label>
                        <select id="category" name="category" required>
                            <option value="elektronik">Elektronik</option>
                            <option value="furniture">Furnitur</option>
                            <option value="pakaian">Pakaian</option>
                            <option value="buku">Alat Tulis</option>
                            <option value="alatOlahraga">Peralatan Olahraga</option>
                            <option value="alatKecantikan">Alat Kecantikan</option>
                            <option value="kendaraan">Kendaraan</option>
                            <option value="alatDapur">Alat Dapur</option>
                            <option value="perlengkapanBayi">Perlengkapan Bayi</option>
                            <option value="mainan">Mainan</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="condition">Kondisi</label>
                        <select id="condition" name="condition" required>
                            <option value="new">Baru</option>
                            <option value="second">Bekas</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Harga (Rp)</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            placeholder="Masukkan harga barang"
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        {errorMessage && <span className="error-message">{errorMessage}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="product-image">Unggah Gambar</label>
                        <input type="file" id="product-image" name="product-image" accept="image/*" required />
                    </div>

                    <button type="submit" className="submit-button">Jual Barang</button>
                </form>
                <h2>Barang yang Dijual</h2>
                <div className="item-grid">
                    {barang.map(item => (
                        <div className="item-card" key={item.id}>
                            <img src={item.urlGambar} alt={item.nama} className="item-image" />
                            <div className="item-info">
                                <h3>{item.nama}</h3>
                                <p>{item.deskripsi}</p>
                                <p className="price">Rp {item.harga}</p>
                                <p>Kondisi: {item.kondisi}</p>
                                <p>Kategori: {item.kategori}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default JualBarangSection;
