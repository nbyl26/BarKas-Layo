import '../assets/styles/KategoriBarang.css';

import imgElektronik from '../assets/img/elektronik.png';
import imgFurnitur from '../assets/img/furniture.png';
import imgPakaian from '../assets/img/pakaian.png';
import imgAlatTulis from '../assets/img/stationery.png';
import imgAlatOlahraga from '../assets/img/sport.png';
import imgAlatKecantikan from '../assets/img/makeup.png';
import imgKendaraan from '../assets/img/motorcycle.png';
import imgAlatDapur from '../assets/img/kitchen.png';
import imgPerlengkapanBayi from '../assets/img/baby-products.png';
import imgMainan from '../assets/img/game-console.png';

function KategoriBarang() {
  return (
    <section className="categories-2">
      <div className="container">
        <h2><span>Kategori</span> Barang</h2>
        <div className="category-grid">
          <div className="category-item">
            <img src={imgElektronik} alt="Elektronik" />
            <h3>Elektronik</h3>
          </div>
          <div className="category-item">
            <img src={imgFurnitur} alt="Furnitur" />
            <h3>Furniture</h3>
          </div>
          <div className="category-item">
            <img src={imgPakaian} alt="Pakaian" />
            <h3>Pakaian</h3>
          </div>
          <div className="category-item">
            <img src={imgAlatTulis} alt="Alat Tulis" />
            <h3>Alat Tulis</h3>
          </div>
          <div className="category-item">
            <img src={imgAlatOlahraga} alt="Olahraga" />
            <h3>Peralatan Olahraga</h3>
          </div>
          <div className="category-item">
            <img src={imgAlatKecantikan} alt="Alat Kecantikan" />
            <h3>Alat Kecantikan</h3>
          </div>
          <div className="category-item">
            <img src={imgKendaraan} alt="Kendaraan" />
            <h3>Kendaraan</h3>
          </div>
          <div className="category-item">
            <img src={imgAlatDapur} alt="Alat Dapur" />
            <h3>Alat Dapur</h3>
          </div>
          <div className="category-item">
            <img src={imgPerlengkapanBayi} alt="Perlengkapan Bayi" />
            <h3>Perlengkapan Bayi</h3>
          </div>
          <div className="category-item">
            <img src={imgMainan} alt="Mainan" />
            <h3>Mainan</h3>
          </div>
        </div>
      </div>
    </section>
  );
}

export default KategoriBarang;
