import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig'; 
import '../assets/styles/KategoriBarangSection.css';

function KategoriBarangSection() {
    const [products, setProducts] = useState([]);
    const location = useLocation();

    const category = new URLSearchParams(location.search).get('category');
    console.log("Selected Category:", category); // Log untuk memeriksa kategori yang diterima

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const q = query(
                    collection(db, 'products'),
                    where('category', '==', category) 
                );

                const querySnapshot = await getDocs(q);
                const fetchedProducts = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                console.log("Filtered Products:", fetchedProducts); // Log produk yang difilter
                setProducts(fetchedProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        if (category) {
            fetchProducts();
        }
    }, [category]);

    const formatCategoryName = (category) => {
        return category
            .replace(/([a-z])([A-Z])/g, '$1 $2') 
            .replace(/^./, (str) => str.toUpperCase()); 
    };

    return (
        <section className="kategori-barang">
            <div className="container">
                <h2>Barang Kategori <span>{formatCategoryName(category)}</span></h2>
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
