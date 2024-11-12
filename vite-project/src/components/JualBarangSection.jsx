import React, { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
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


    const handleSubmit = async (event) => {
        event.preventDefault();
        const priceValue = parseFloat(price);

        if (priceValue <= 0) {
            setErrorMessage('Harga harus lebih besar dari 0.');
            return;
        }

        const name = event.target['product-name'].value;
        const description = event.target['product-description'].value;
        const category = event.target['category'].value;
        const condition = event.target['condition'].value;
        const image = event.target['product-image'].files[0];

        if (image) {
            // Jika gambar ada, simpan nama file gambar ke Firestore
            try {
                await addDoc(collection(db, 'products'), {
                    name,
                    description,
                    category,
                    condition,
                    price: priceValue,
                    image: image.name,  // Menyimpan nama gambar saja
                    userId: user.uid,   // Menyimpan userId sebagai penjual
                    createdAt: serverTimestamp()
                });

                alert('Barang telah ditambahkan untuk dijual!');
                setErrorMessage('');
                event.target.reset();
            } catch (error) {
                console.error('Error adding document: ', error);
                setErrorMessage('Terjadi kesalahan saat menambahkan barang: ' + error.message);
            }
        } else {
            setErrorMessage('Gambar barang harus diunggah.');
        }
    };




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
                            <option value="alatTulis">Alat Tulis</option>
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
            </div>
        </section>
    );
}

export default JualBarangSection;