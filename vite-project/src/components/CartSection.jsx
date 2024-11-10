import React, { useEffect } from 'react';
import { useCart } from './context/CartContext';
import '../assets/styles/CartSection.css';

const CartSection = () => {
    const { cart, dispatch } = useCart();

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            dispatch({ type: 'SET_CART', payload: JSON.parse(storedCart) });
        }
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const handleRemoveFromCart = (item) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: item });
    };

    return (
        <div className="cart-container">
            <h2 className="cart-title">Keranjang Belanja Anda</h2>
            <p className="cart-description">Nikmati pengalaman berbelanja yang mudah dan nyaman.</p>
            {cart.length === 0 ? (
                <div className="empty-cart">
                    <p>Keranjang Anda kosong.</p>
                </div>
            ) : (
                <div className="cart-items-container">
                    <div className="cart-header">
                        <span className="header-item">Produk</span>
                        <span className="header-price">Harga</span>
                        <span className="header-quantity">Jumlah</span>
                        <span className="header-actions">Aksi</span>
                    </div>
                    <ul className="cart-list">
                        {cart.map(item => (
                            <li key={item.id} className="cart-item">
                                <div className="item-details">
                                    <img src={item.image} alt={item.name} className="item-image" />
                                    <div className="item-info">
                                        <h4 className="item-name">{item.name}</h4>
                                        <p className="item-description">{item.description}</p>
                                    </div>
                                </div>
                                <span className="item-price">Rp {item.price}</span>
                                <span className="item-quantity">x{item.quantity}</span>
                                <button
                                    className="remove-button"
                                    onClick={() => handleRemoveFromCart(item)}
                                >
                                    Hapus
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {cart.length > 0 && (
                <div className="cart-actions">
                    <button
                        className="clear-cart-button"
                        onClick={() => dispatch({ type: 'CLEAR_CART' })}
                    >
                        Kosongkan Keranjang
                    </button>
                    <button className="checkout-button">
                        Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartSection;
