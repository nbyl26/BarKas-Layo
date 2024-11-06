import React from 'react'
import '../assets/styles/FilterPencarian.css'

function FilterPencarian() {
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="filter-bar">
      <h2><span>Filter</span> Pencarian</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="kategori">Kategori:</label>
        <select id="kategori" name="kategori">
          <option value="elektronik">Elektronik</option>
          <option value="furnitur">Furnitur</option>
          <option value="pakaian">Pakaian</option>
          <option value="stationery">Alat Tulis</option>
        </select>
        
        <label htmlFor="min-price">Harga Minimum:</label>
        <input type="number" id="min-price" name="min-price" placeholder="Rp 0" />
        
        <label htmlFor="max-price">Harga Maksimum:</label>
        <input type="number" id="max-price" name="max-price" placeholder="Rp 10.000.000" />
        
        <label htmlFor="kondisi">Kondisi:</label>
        <select id="kondisi" name="kondisi">
          <option value="baru">Baru</option>
          <option value="bekas">Bekas</option>
        </select>
        
        <button type="submit">Terapkan Filter</button>
      </form>
    </div>
  )
}

export default FilterPencarian
