import React, { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import '../assets/styles/JualBarangSection.css';

function JualBarangSection() {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const imageInput = document.getElementById('product-image');
        const handleImageUpload = (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
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

    const handleSubmit = (e) => {
      e.preventDefault(); // Mencegah reload halaman
      if (!user) {
          alert("Silakan login terlebih dahulu untuk menjual barang.");
          return;
      }
      alert("Barang berhasil dijual!"); // Ini hanya placeholder
  };
  

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
                        <input type="number" id="price" name="price" placeholder="Masukkan harga barang" required />
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
