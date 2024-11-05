import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; // Import Supabase client
import '../assets/styles/SemuaBarangSection.css';

function SemuaBarangSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products') // Mengambil data dari tabel 'products'
        .select('*');

      if (error) {
        setError(error.message);
      } else {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Menampilkan loading saat data sedang diambil
  }

  if (error) {
    return <p>Error: {error}</p>; // Menampilkan pesan kesalahan jika ada
  }

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
