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

    const handleIncreaseQuantity = (item) => {
        dispatch({ type: 'INCREASE_QUANTITY', payload: item });
    };

    const handleDecreaseQuantity = (item) => {
        if (item.quantity > 1) {
            dispatch({ type: 'DECREASE_QUANTITY', payload: item });
        }
    };

    return (
        <div className="cartSection-container">
            <h2 className="cartSection-title"><span>Keranjang</span> Belanja Anda</h2>
            <p className="cartSection-description">Nikmati pengalaman berbelanja yang mudah dan nyaman.</p>
            {cart.length === 0 ? (
                <div className="cartSection-empty">
                    <p>Keranjang Anda kosong.</p>
                </div>
            ) : (
                <div className="cartSection-items">
                    <div className="cartSection-header">
                        <span className="cartSection-header-item">Produk</span>
                        <span className="cartSection-header-price">Harga</span>
                        <span className="cartSection-header-quantity">Jumlah</span>
                        <span className="cartSection-header-actions">Aksi</span>
                    </div>
                    <ul className="cartSection-list">
                        {cart.map(item => (
                            <li key={item.id} className="cartSection-item">
                                <div className="cartSection-item-details">
                                    <img src={item.image} alt={item.name} className="cartSection-item-image" />
                                    <div className="cartSection-item-info">
                                        <h4 className="cartSection-item-name">{item.name}</h4>
                                        <p className="cartSection-item-description">{item.description}</p>
                                    </div>
                                </div>
                                <span className="cartSection-item-price">Rp {item.price}</span>
                                <div className="cartSection-item-quantity-container">
                                    <button
                                        className="cartSection-quantity-button"
                                        onClick={() => handleDecreaseQuantity(item)}
                                    >
                                        -
                                    </button>
                                    <span className="cartSection-item-quantity">{item.quantity}</span>
                                    <button
                                        className="cartSection-quantity-button"
                                        onClick={() => handleIncreaseQuantity(item)}
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    className="cartSection-remove-button"
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
                <div className="cartSection-actions">
                    <button
                        className="cartSection-clear-cart-button"
                        onClick={() => dispatch({ type: 'CLEAR_CART' })}
                    >
                        Kosongkan Keranjang
                    </button>
                    <button className="cartSection-checkout-button">
                        Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartSection;
