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
    const [name, setName] = useState(''); // Menggunakan 'name' sesuai dengan field di database
    const [description, setDescription] = useState(''); // Menggunakan 'description' sesuai dengan field di database
    const [category, setCategory] = useState(''); // Menggunakan 'category' sesuai dengan field di database
    const [condition, setCondition] = useState(''); // Menggunakan 'condition' sesuai dengan field di database
    const [price, setPrice] = useState(''); // Menggunakan 'price' sesuai dengan field di database
    const [image, setImage] = useState(null); // Menggunakan 'image' sesuai dengan field di database
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
        if (!image) {
            alert("Silakan unggah gambar");
            return;
        }

        console.log("Data yang akan diunggah:", {
            name,
            description,
            category,
            condition,
            price,
            image
        });

        const storageRef = ref(storage, `images/${image.name}`);
        
        // Upload gambar ke Firebase Storage
        try {
            await uploadBytes(storageRef, image);
            const urlImage = await getDownloadURL(storageRef);

            // Tambahkan dokumen ke Firestore
            await addDoc(collection(db, 'barang'), {
                name,          // Menggunakan 'name' untuk menyimpan nama barang
                description,   // Menggunakan 'description' untuk menyimpan deskripsi barang
                category,      // Menggunakan 'category' untuk menyimpan kategori
                condition,     // Menggunakan 'condition' untuk menyimpan kondisi barang
                price,         // Menggunakan 'price' untuk menyimpan harga
                image: urlImage // Menyimpan URL gambar yang diunggah
            });
            alert("Barang berhasil diunggah!"); // Tampilkan pesan jika berhasil
            setIsItemUploaded(true); // Update status item diunggah
        } catch (error) {
            console.error("Error adding document: ", error);
            setErrorMessage("Gagal menambahkan barang. Silakan coba lagi."); // Tampilkan pesan kesalahan
        }

        // Reset form
        setName('');
        setDescription('');
        setCategory('');
        setCondition('');
        setPrice('');
        setImage(null);
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
            setImage(file); // Simpan gambar ke state
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
                            value={name} // Menggunakan 'name'
                            onChange={(e) => setName(e.target.value)} // Menggunakan 'setName'
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
                            value={description} // Menggunakan 'description'
                            onChange={(e) => setDescription(e.target.value)} // Menggunakan 'setDescription'
                            required
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Kategori</label>
                        <select
                            id="category"
                            name="category"
                            value={category} // Menggunakan 'category'
                            onChange={(e) => setCategory(e.target.value)} // Menggunakan 'setCategory'
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
                            value={condition} // Menggunakan 'condition'
                            onChange={(e) => setCondition(e.target.value)} // Menggunakan 'setCondition'
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
                            value={price} // Menggunakan 'price'
                            onChange={(e) => setPrice(e.target.value)} // Menggunakan 'setPrice'
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
                                        <img src={item.image} alt={item.name} className="item-image" /> {/* Menggunakan 'image' */}
                                        <div className="item-info">
                                            <h3>{item.name}</h3> {/* Menggunakan 'name' */}
                                            <p>{item.description}</p> {/* Menggunakan 'description' */}
                                            <p className="price">Rp {item.price}</p> {/* Menggunakan 'price' */}
                                            <p>Kondisi: {item.condition}</p> {/* Menggunakan 'condition' */}
                                            <p>Kategori: {item.category}</p> {/* Menggunakan 'category' */}
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
