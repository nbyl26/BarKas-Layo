import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/FilterPencarian.css';

function FilterPencarian() {
  const [kategori, setKategori] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [kondisi, setKondisi] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/Filter', {
      state: { kategori, minPrice, maxPrice, kondisi }
    });
  };

  return (
    <div className="filter-bar">
      <h2><span>Filter</span> Pencarian</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="kategori">Kategori:</label>
        <select
          id="kategori"
          name="kategori"
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
        >
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

        <label htmlFor="min-price">Harga Minimum:</label>
        <input
          type="number"
          id="min-price"
          name="min-price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="Rp 0"
        />

        <label htmlFor="max-price">Harga Maksimum:</label>
        <input
          type="number"
          id="max-price"
          name="max-price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Rp 10.000.000"
        />

        <label htmlFor="kondisi">Kondisi:</label>
        <select
          id="kondisi"
          name="kondisi"
          value={kondisi}
          onChange={(e) => setKondisi(e.target.value)}
        >
          <option value="">Pilih Kondisi</option>
          <option value="new">Baru</option>
          <option value="second">Bekas</option>
        </select>

        <button type="submit">Terapkan Filter</button>
      </form>
    </div>
  );
}

export default FilterPencarian;
