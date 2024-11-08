import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import '../assets/styles/SearchPageSection.css';

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
        const q = query(productsCollection, where('name', '>=', term), where('name', '<=', term + '\uf8ff'));
        const querySnapshot = await getDocs(q);
        const fetchedProducts = querySnapshot.docs.map(doc => doc.data());
        setProducts(fetchedProducts);
        setLoading(false);
    };

    return (
        <div className="search-page">
            <h2>Hasil Pencarian untuk: "{searchTerm}"</h2>
            {loading ? (
                <p>Loading...</p>
            ) : products.length > 0 ? (
                <div className="products-list">
                    {products.map((product, index) => (
                        <div key={index} className="product-card">
                            <img src={product.image} alt={product.name} className="item-image" />
                                <div className="item-info">
                                    <h3>{product.name}</h3>
                                    <p>{product.description}</p>
                                    <p>{product.condition}</p>
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
    );
};

export default SearchPageSection;
