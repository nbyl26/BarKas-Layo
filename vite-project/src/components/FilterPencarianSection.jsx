import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import '../assets/styles/FilterPencarianSection.css';

function FilterPencarianSection() {
  const location = useLocation();
  const { kategori, minPrice, maxPrice, kondisi } = location.state || {}; // Mendapatkan filter dari props
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      const minPriceVal = parseInt(minPrice) || 0;
      const maxPriceVal = parseInt(maxPrice) || 10000000;

      let q = query(
        collection(db, 'products'),
        where('category', '==', kategori),
        where('price', '>=', minPriceVal),
        where('price', '<=', maxPriceVal)
      );

      if (kondisi) {
        q = query(q, where('condition', '==', kondisi));
      }

      try {
        // Mengambil data produk yang sesuai dengan query
        const querySnapshot = await getDocs(q);
        console.log('Query Snapshot:', querySnapshot); // Debugging query snapshot

        const filteredProducts = querySnapshot.docs.map(doc => doc.data());
        console.log('Filtered Products:', filteredProducts); // Debugging filtered products

        setProducts(filteredProducts); // Menyimpan produk yang sudah difilter
      } catch (error) {
        console.error('Error fetching filtered products:', error);
      }
    };

    fetchFilteredProducts(); // Menjalankan fungsi pengambilan produk
  }, [kategori, minPrice, maxPrice, kondisi]); // Menyinkronkan filter jika ada perubahan

  return (
    <section className="filtered-products">
        <div className="container">
      <h1><span>Produk yang</span> Terfilter</h1>
      <div className="products-list">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div key={index} className="product-item">
              <img src={product.image} alt={product.name} className="item-image" />
              <div className="item-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>{product.condition}</p>
              <p className="price">{product.price}</p>
              <a href={`/DetailBarang?item=${product.id}`} className="detail-button">Detail</a>
              </div>
            </div>
            
          ))
        ) : (
          <p>Produk tidak ditemukan dengan filter yang dipilih.</p>
        )}
      </div>
      </div>
    </section>
  );
}

export default FilterPencarianSection;
