import '../assets/styles/SemuaBarangSection.css'

import imgLaptop from '../Assets/img/laptop.png';
import imgSepeda from '../Assets/img/bicycle.png';
import imgLemari from '../Assets/img/cupboard.png'; 

function SemuaBarangSection() {
  return (
    <section className="all-items">
      <div className="container">
        <h1><span>Semua</span> Barang</h1>
        <div className="item-grid">
          <div className="item-card">
            <img src={imgLaptop} alt="Barang 1" className="item-image" />
            <div className="item-info">
              <h3>Laptop</h3>
              <p className="price">Rp 3.500.000</p>
              <a href="/DetailBarang?item=laptop" className="detail-button">Detail</a>
            </div>
          </div>
          <div className="item-card">
            <img src={imgSepeda} alt="Barang 2" className="item-image" />
            <div className="item-info">
              <h3>Sepeda</h3>
              <p className="price">Rp 2.200.000</p>
              <a href="/DetailBarang?item=sepeda" className="detail-button">Detail</a>
            </div>
          </div>
          <div className="item-card">
            <img src={imgLemari} alt="Barang 3" className="item-image" />
            <div className="item-info">
              <h3>Lemari</h3>
              <p className="price">Rp 5.200.000</p>
              <a href="/DetailBarang?item=lemari" className="detail-button">Detail</a>
            </div>
          </div>
          <div className="item-card">
            <img src={imgLaptop} alt="Barang 1" className="item-image" />
            <div className="item-info">
              <h3>Laptop</h3>
              <p className="price">Rp 3.500.000</p>
              <a href="/DetailBarang?item=laptop" className="detail-button">Detail</a>
            </div>
          </div>
          <div className="item-card">
            <img src={imgSepeda} alt="Barang 2" className="item-image" />
            <div className="item-info">
              <h3>Sepeda</h3>
              <p className="price">Rp 2.200.000</p>
              <a href="/DetailBarang?item=sepeda" className="detail-button">Detail</a>
            </div>
          </div>
          <div className="item-card">
            <img src={imgLemari} alt="Barang 3" className="item-image" />
            <div className="item-info">
              <h3>Lemari</h3>
              <p className="price">Rp 5.200.000</p>
              <a href="/DetailBarang?item=lemari" className="detail-button">Detail</a>
            </div>
          </div>
          <div className="item-card">
            <img src={imgLaptop} alt="Barang 1" className="item-image" />
            <div className="item-info">
              <h3>Laptop</h3>
              <p className="price">Rp 3.500.000</p>
              <a href="/DetailBarang?item=laptop" className="detail-button">Detail</a>
            </div>
          </div>
          <div className="item-card">
            <img src={imgSepeda} alt="Barang 2" className="item-image" />
            <div className="item-info">
              <h3>Sepeda</h3>
              <p className="price">Rp 2.200.000</p>
              <a href="/DetailBarang?item=sepeda" className="detail-button">Detail</a>
            </div>
          </div>
          <div className="item-card">
            <img src={imgLemari} alt="Barang 3" className="item-image" />
            <div className="item-info">
              <h3>Lemari</h3>
              <p className="price">Rp 5.200.000</p>
              <a href="/DetailBarang?item=lemari" className="detail-button">Detail</a>
            </div>
          </div>
          <div className="item-card">
            <img src={imgLaptop} alt="Barang 1" className="item-image" />
            <div className="item-info">
              <h3>Laptop</h3>
              <p className="price">Rp 3.500.000</p>
              <a href="/DetailBarang?item=laptop" className="detail-button">Detail</a>
            </div>
          </div>
          <div className="item-card">
            <img src={imgSepeda} alt="Barang 2" className="item-image" />
            <div className="item-info">
              <h3>Sepeda</h3>
              <p className="price">Rp 2.200.000</p>
              <a href="/DetailBarang?item=sepeda" className="detail-button">Detail</a>
            </div>
          </div>
          <div className="item-card">
            <img src={imgLemari} alt="Barang 3" className="item-image" />
            <div className="item-info">
              <h3>Lemari</h3>
              <p className="price">Rp 5.200.000</p>
              <a href="/DetailBarang?item=lemari" className="detail-button">Detail</a>
            </div>
          </div>
          <div className="item-card">
            <img src={imgLemari} alt="Barang 3" className="item-image" />
            <div className="item-info">
              <h3>Lemari</h3>
              <p className="price">Rp 5.200.000</p>
              <a href="/DetailBarang?item=lemari" className="detail-button">Detail</a>
            </div>
          </div>
          <div className="item-card">
            <img src={imgLaptop} alt="Barang 1" className="item-image" />
            <div className="item-info">
              <h3>Laptop</h3>
              <p className="price">Rp 3.500.000</p>
              <a href="/DetailBarang?item=laptop" className="detail-button">Detail</a>
            </div>
          </div>
          <div className="item-card">
            <img src={imgSepeda} alt="Barang 2" className="item-image" />
            <div className="item-info">
              <h3>Sepeda</h3>
              <p className="price">Rp 2.200.000</p>
              <a href="/DetailBarang?item=sepeda" className="detail-button">Detail</a>
            </div>
          </div>
          <div className="item-card">
            <img src={imgLemari} alt="Barang 3" className="item-image" />
            <div className="item-info">
              <h3>Lemari</h3>
              <p className="price">Rp 5.200.000</p>
              <a href="/DetailBarang?item=lemari" className="detail-button">Detail</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SemuaBarangSection;
