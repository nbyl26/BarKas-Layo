import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import '../../assets/styles/Beranda/FilterPencarian/FilterPencarianSection.css';

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
        const querySnapshot = await getDocs(q);
        console.log('Query Snapshot:', querySnapshot);

        const filteredProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('Filtered Products:', filteredProducts);

        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching filtered products:', error);
      }
    };

    fetchFilteredProducts();
  }, [kategori, minPrice, maxPrice, kondisi]);

  const formatCategoryName = (category) => {
    return category
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <section className="filtered-products">
      <div className="container">
        <h1><span>Produk yang</span> Terfilter</h1>
        <div className="products-listt">
          {products.length > 0 ? (
            products.map((product, index) => (
              <div key={index} className="product-item">
                <img src={product.image} alt={product.name} className="item-image" />
                <div className="item-info">
                  <h3>{product.name}</h3>
                  <p>Kondisi: {product.condition}</p>
                  <p>Kategori: {formatCategoryName(product.category)}</p>
                  <p className="price">Rp {product.price}</p>
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