import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';
import '../assets/styles/SemuaBarang/SemuaBarangSection.css';

function SemuaBarangSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="all-items">
      <div className="container">
        <h1><span>Semua</span> Barang</h1>
        <div className="item-grid">
          {products.length === 0 ? (
            <p>Tidak ada barang yang tersedia.</p>
          ) : (
            products.map(product => (
              <div key={product.id} className="item-card">
                <img src={product.image} alt={product.name} className="item-image" />
                <div className="item-info">
                  <h3>{product.name}</h3>
                  <p className="price">Rp {product.price}</p>
                  <a href={`/DetailBarang?item=${product.id}`} className="detail-button">Detail</a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default SemuaBarangSection;