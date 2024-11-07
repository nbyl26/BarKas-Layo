import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import '../assets/styles/KategoriBarangSection.css';

function KategoriBarangSection() {
    const [products, setProducts] = useState([]);
    const location = useLocation();

    const category = new URLSearchParams(location.search).get('category-items');

    useEffect(() => {
        const fetchProducts = async () => {
            const db = getFirestore();
            const querySnapshot = await getDocs(collection(db, 'products'));
            const fetchedProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log("All Products:", fetchedProducts); // log semua produk tanpa filter
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
                            <img src={product.image} alt={product.name} className="item-image" />
                            <div className="item-info">
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>{product.condition}</p>
                            <p className="price">{product.price}</p>
                            <a href={`/DetailBarang?item=${product.id}`} className="detail-button">Detail</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default KategoriBarangSection;
