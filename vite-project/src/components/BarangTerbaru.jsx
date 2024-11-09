import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/BarangTerbaru.css';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function BarangTerbaru() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(3));
        const querySnapshot = await getDocs(q);

        // Menyimpan data produk ke dalam state
        const latestProducts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(latestProducts);
      } catch (error) {
        console.error("Error fetching latest products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDetailNavigation = (itemId) => {
    navigate(`/DetailBarang?item=${itemId}`);
  };

  return (
    <section className="featured-items">
      <div className="container">
        <h2><span>Barang</span> Terbaru</h2>
        <div className="item-grid">
          {products.map(product => (
            <div key={product.id} className="item-card" onClick={() => handleDetailNavigation(product.id)}>
              <img src={product.image} alt={product.name} className="item-image" />
              <div className="item-info">
                <h3>{product.name}</h3>
                <p>Kondisi: {product.condition}</p>
                <p>Kategori: {product.category}</p>
                <p className="price">Rp {product.price}</p>
                <button className="detail-button">Detail</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BarangTerbaru;
