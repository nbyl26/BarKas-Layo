import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import '../assets/styles/FilterPencarianSection.css';

function FilterPencarianSection() {
  const location = useLocation();
  const { kategori, minPrice, maxPrice, kondisi } = location.state || {};
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      const q = query(
        collection(db, 'products'),
        where('category', '==', kategori),
        where('price', '>=', minPrice || 0),
        where('price', '<=', maxPrice || 10000000),
        where('condition', '==', kondisi)
      );
      
      const querySnapshot = await getDocs(q);
      const filteredProducts = querySnapshot.docs.map(doc => doc.data());
      setProducts(filteredProducts);
    };

    fetchFilteredProducts();
  }, [kategori, minPrice, maxPrice, kondisi]);

  return (
    <section className="filtered-products">
      <h2>Produk yang Terfilter</h2>
      <div className="products-list">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div key={index} className="product-item">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>{product.price}</p>
              <p>{product.condition}</p>
            </div>
          ))
        ) : (
          <p>Produk tidak ditemukan dengan filter yang dipilih.</p>
        )}
      </div>
    </section>
  );
}

export default FilterPencarianSection;
