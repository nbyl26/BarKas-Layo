import { useNavigate } from 'react-router-dom'
import '../assets/styles/KategoriPopuler.css'

import imgElektronik from '../assets/img/elektronik.png'
import imgFurnitur from '../assets/img/furniture.png'
import imgPakaian from '../assets/img/pakaian.png'
import imgAlatTulis from '../assets/img/stationery.png'


function KategoriPopuler() {
  const navigate = useNavigate()

  const handleNavigation = (category) => {
    navigate(`/KategoriBarang?category-items=${category}`)
  }

  return (
    <section className="categories">
      <div className="container">
        <h1><span>Kategori</span> Populer</h1>
        <div className="category-grid">
          <div className="category-item" onClick={() => handleNavigation('elektronik')}>
        <img src={imgElektronik} alt="Elektronik" />
            <h3>Elektronik</h3>
          </div>
          <div className="category-item" onClick={() => handleNavigation('furnitur')}>
            <img src={imgFurnitur} alt="Furnitur" />
            <h3>Furnitur</h3>
          </div>
          <div className="category-item" onClick={() => handleNavigation('pakaian')}>
            <img src={imgPakaian} alt="Pakaian" />
            <h3>Pakaian</h3>
          </div>
          <div className="category-item" onClick={() => handleNavigation('alat-tulis')}>
            <img src={imgAlatTulis} alt="Alat Tulis" />
            <h3>Alat Tulis</h3>
          </div>
        </div>
      </div>
    </section>
  )
}

export default KategoriPopuler
