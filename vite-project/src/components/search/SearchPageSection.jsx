import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import '../../assets/styles/SearchPages/SearchPageSection.css';

const SearchPageSection = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const searchTerm = queryParams.get('query');

    useEffect(() => {
        if (searchTerm) {
            fetchProducts(searchTerm);
        }
    }, [searchTerm]);

    const fetchProducts = async (term) => {
        setLoading(true);
        const productsCollection = collection(db, 'products');

        const q = query(
            productsCollection,
            where('name', '>=', term),
            where('name', '<=', term + '\uf8ff')
        );
        try {
            const querySnapshot = await getDocs(q);
            const fetchedProducts = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProducts(fetchedProducts);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
        setLoading(false);
    };

    const formatCategoryName = (category) => {
        return category
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/^./, (str) => str.toUpperCase());
    };

    return (
        <section className="search-page">
            <div className="container">
                <h1>Hasil Pencarian untuk: <span>"{searchTerm}"</span></h1>
                <div className="product-grid">
                    {loading ? (
                        <p>Loading...</p>
                    ) : products.length > 0 ? (
                        <div className="products-list">
                            {products.map((product) => (
                                <div key={product.id} className="product-item">
                                    <img src={product.image} alt={product.name} className="item-image" />
                                    <div className="item-info">
                                        <h3>{product.name}</h3>
                                        <p>Kondisi: {product.condition}</p>
                                        <p>Kategori: {formatCategoryName(product.category)}</p>
                                        <p className="price">Rp {product.price}</p>
                                        <a href={`/DetailBarang?item=${product.id}`} className="detail-button">Detail</a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Tidak ada produk yang ditemukan</p>
                    )}
                </div>
            </div>
        </section >
    );
};

export default SearchPageSection;
