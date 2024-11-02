import React from 'react';
import { useCart } from '../components/CartContext';

const Cart = () => {
    const { cart, dispatch } = useCart();

    const handleRemoveFromCart = (item) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: item });
    };

    return (
        <div>
            <h2>Keranjang Belanja</h2>
            {cart.length === 0 ? (
                <p>Keranjang Anda kosong.</p>
            ) : (
                <ul>
                    {cart.map(item => (
                        <li key={item.id}>
                            {item.name} - {item.price}
                            <button onClick={() => handleRemoveFromCart(item)}>Hapus</button>
                        </li>
                    ))}
                </ul>
            )}
            {cart.length > 0 && (
                <button onClick={() => dispatch({ type: 'CLEAR_CART' })}>
                    Kosongkan Keranjang
                </button>
            )}
        </div>
    );
};

export default Cart;
