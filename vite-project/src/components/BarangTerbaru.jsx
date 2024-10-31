import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../assets/styles/BarangTerbaru.css'
// import { supabase} from '@supabase/supabase-js'
import { getAllUsers, loginUserByEmailAndPassword } from '../lib/networks/user'

import imgLaptop from '../assets/img/laptop.png'
import imgBicycle from '../assets/img/bicycle.png'
import imgCupboard from '../assets/img/cupboard.png'

function BarangTerbaru() {

  const login = async () => {

    await loginUserByEmailAndPassword('nabilpasha230606@gmail.com', 'nW-QvXzqVdUPg97');
  }

  login();
  const navigate = useNavigate()

  const handleDetailNavigation = (item) => {
    navigate(`/DetailBarang?item=${item}`)
  }

  return (
    <section className="featured-items">
      <div className="container">
        <h2>Barang Terbaru</h2>
        <div className="item-grid">
          <div className="item-card" onClick={() => handleDetailNavigation('laptop')}>
            <img src={imgLaptop} alt="Barang 1" className="item-image" />
            <div className="item-info">
              <h3>Laptop Bekas</h3>
              <p>Kondisi: Baik, masih lancar</p>
              <p className="price">Rp 3.500.000</p>
              <button className="detail-button">Detail</button>
            </div>
          </div>
          <div className="item-card" onClick={() => handleDetailNavigation('sepeda')}>
            <img src={imgBicycle} alt="Barang 2" className="item-image" />
            <div className="item-info">
              <h3>Sepeda Gunung</h3>
              <p>Kondisi: Jarang dipakai, like new</p>
              <p className="price">Rp 2.200.000</p>
              <button className="detail-button">Detail</button>
            </div>
          </div>
          <div className="item-card" onClick={() => handleDetailNavigation('lemari')}>
            <img src={imgCupboard} alt="Barang 3" className="item-image" />
            <div className="item-info">
              <h3>Lemari Kayu Jati</h3>
              <p>Kondisi: Sangat baik, seperti baru</p>
              <p className="price">Rp 5.200.000</p>
              <button className="detail-button">Detail</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BarangTerbaru
