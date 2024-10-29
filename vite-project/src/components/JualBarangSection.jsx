import React, { useEffect } from 'react';
import '../assets/styles/JualBarangSection.css';

function JualBarangSection() {
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
    
        // Cleanup function untuk menghapus event listener saat komponen di-unmount
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
        <form action="#" method="POST" className="sell-form">
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
