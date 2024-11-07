import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import '../assets/styles/KategoriBarang.css';

function KategoriBarangSection() {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  
  const category = new URLSearchParams(location.search).get('category-items');

  useEffect(() => {
    const fetchProducts = async () => {
      const db = getFirestore();
      const q = query(
        collection(db, 'products'),
        where('kategori', '==', category)
      );

      const querySnapshot = await getDocs(q);
      const fetchedProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, [category]);

  return (
    <section className="kategori-barang">
      <div className="container">
        <h1>Barang Kategori <span>{category}</span></h1>
        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-item">
              <img src={product.imageUrl} alt={product.nama} />
              <h3>{product.nama}</h3>
              <p>{product.harga}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default KategoriBarangSection;
