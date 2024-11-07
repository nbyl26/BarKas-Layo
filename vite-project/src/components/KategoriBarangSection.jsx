import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import '../assets/styles/KategoriBarangSection.css';

function KategoriBarangSection() {
    const [products, setProducts] = useState([]);
    const location = useLocation();

    const category = new URLSearchParams(location.search).get('category');

    useEffect(() => {
        const fetchProducts = async () => {
            const db = getFirestore();

            const q = query(
                collection(db, 'products'),
                where('kategori', '==', category)
            );

            const querySnapshot = await getDocs(q);
            const fetchedProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log("Filtered Products:", fetchedProducts);

            setProducts(fetchedProducts);
        };

        if (category) {
            fetchProducts();
        }
    }, [category]);

    return (
        <section className="kategori-barang">
            <div className="container">
                <h1>Barang Kategori <span>{category}</span></h1>
                <div className="product-grid">
                    {products.length > 0 ? (
                        products.map(product => (
                            <div key={product.id} className="product-item">
                                <img src={product.image} alt={product.name} className="item-image" />
                                <div className="item-info">
                                    <h3>{product.name}</h3>
                                    <p>{product.description}</p>
                                    <p>{product.condition}</p>
                                    <p className="price">Rp {product.price}</p>
                                    <a href={`/DetailBarang?item=${product.id}`} className="detail-button">Detail</a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Tidak ada barang dalam kategori ini.</p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default KategoriBarangSection;
