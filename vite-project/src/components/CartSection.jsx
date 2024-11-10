import React, { useEffect } from 'react';
import { useCart } from './context/CartContext';
import '../assets/styles/CartSection.css';

const CartSection = () => {
    const { cart, dispatch } = useCart();

    // Ambil data dari localStorage saat komponen pertama kali dimuat
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            dispatch({ type: 'SET_CART', payload: JSON.parse(storedCart) });
        }
    }, [dispatch]);

    // Simpan data keranjang ke localStorage setiap kali cart berubah
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const handleRemoveFromCart = (item) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: item });
    };

    return (
        <div className="cart-container">
            <h2 className="cart-title">Keranjang Belanja</h2>
            {cart.length === 0 ? (
                <div className="empty-cart">
                    <p>Keranjang Anda kosong.</p>
                </div>
            ) : (
                <ul className="cart-list">
                    {cart.map(item => (
                        <li key={item.id} className="cart-item">
                            <span className="item-name">{item.name}</span>
                            <span className="item-price">{item.price}</span>
                            <button
                                className="remove-button"
                                onClick={() => handleRemoveFromCart(item)}
                            >
                                Hapus
                            </button>
                        </li>
                    ))}
                </ul>
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
