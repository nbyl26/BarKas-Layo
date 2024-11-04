import React, { useEffect, useState } from 'react';
import { auth, db, storage } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../assets/styles/JualBarangSection.css';

function JualBarangSection() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [nama, setNama] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [kategori, setKategori] = useState('');
    const [kondisi, setKondisi] = useState('');
    const [harga, setHarga] = useState('');
    const [gambar, setGambar] = useState(null);
    const [barang, setBarang] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isItemUploaded, setIsItemUploaded] = useState(false);

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

        // Cek apakah gambar diunggah
        if (!gambar) {
            alert("Silakan unggah gambar");
            return;
        }

        console.log("Data yang akan diunggah:", {
            nama,
            deskripsi,
            kategori,
            kondisi,
            harga,
            gambar
        });

        const storageRef = ref(storage, `images/${gambar.name}`);
        
        // Upload gambar ke Firebase Storage
        try {
            await uploadBytes(storageRef, gambar);
            const urlGambar = await getDownloadURL(storageRef);

            // Tambahkan dokumen ke Firestore
            await addDoc(collection(db, 'barang'), {
                nama,
                deskripsi,
                kategori,
                kondisi,
                harga,
                urlGambar,
            });
            alert("Barang berhasil diunggah!"); // Tampilkan pesan jika berhasil
            setIsItemUploaded(true); // Update status item diunggah
        } catch (error) {
            console.error("Error adding document: ", error);
            setErrorMessage("Gagal menambahkan barang. Silakan coba lagi."); // Tampilkan pesan kesalahan
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

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setGambar(file); // Simpan gambar ke state
            const reader = new FileReader();
            reader.onload = function (e) {
                const imgPreview = document.createElement('img');
                imgPreview.src = e.target.result;
                imgPreview.style.maxWidth = '100%';
                imgPreview.style.marginTop = '1rem';
                const existingImg = document.querySelector('.sell-form img');
                if (existingImg) {
                    existingImg.remove(); // Hapus preview gambar sebelumnya
                }
                document.querySelector('.sell-form').appendChild(imgPreview);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <section className="sell-form-section">
            <div className="container">
                <h2><span>Jual</span> Barang</h2>
                <form onSubmit={handleUpload} className="sell-form">
                    <div className="form-group">
                        <label htmlFor="product-name">Nama Barang</label>
                        <input
                            type="text"
                            id="product-name"
                            name="product-name"
                            placeholder="Masukkan nama barang"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="product-description">Deskripsi Barang</label>
                        <textarea
                            id="product-description"
                            name="product-description"
                            rows="5"
                            placeholder="Masukkan deskripsi barang"
                            value={deskripsi}
                            onChange={(e) => setDeskripsi(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Kategori</label>
                        <select
                            id="category"
                            name="category"
                            value={kategori}
                            onChange={(e) => setKategori(e.target.value)}
                            required
                        >
                            <option value="">Pilih Kategori</option>
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
                        <select
                            id="condition"
                            name="condition"
                            value={kondisi}
                            onChange={(e) => setKondisi(e.target.value)}
                            required
                        >
                            <option value="">Pilih Kondisi</option>
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
                            value={harga}
                            onChange={(e) => setHarga(e.target.value)}
                        />
                        {errorMessage && <span className="error-message">{errorMessage}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="product-image">Unggah Gambar</label>
                        <input
                            type="file"
                            id="product-image"
                            name="product-image"
                            accept="image/*"
                            onChange={handleImageUpload}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-button">Jual Barang</button>
                </form>

                {isItemUploaded && (
                    <>
                        <h2>Barang yang Dijual</h2>
                        <div className="item-grid">
                            {barang.length > 0 ? (
                                barang.map(item => (
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
                                ))
                            ) : (
                                <p>Belum ada barang yang dijual.</p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

export default JualBarangSection;
