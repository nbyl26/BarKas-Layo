import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useCart } from './context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import '../assets/styles/DetailBarangSection.css';

function DetailBarangSection() {
  const [user, setUser] = useState(null);
  const [itemDetail, setItemDetail] = useState(null);
  const { cart, dispatch } = useCart();

  // Function to get the quantity of the specific item in the cart
  const getItemQuantity = () => {
    const cartItem = cart.find(item => item.id === itemDetail?.id);
    return cartItem ? cartItem.quantity : 0;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchItemDetails = async () => {
      const params = new URLSearchParams(window.location.search);
      const itemId = params.get('item');

      if (itemId) {
        try {
          const itemRef = doc(db, 'products', itemId);
          const itemSnapshot = await getDoc(itemRef);

          if (itemSnapshot.exists()) {
            setItemDetail({ id: itemId, ...itemSnapshot.data() });
          } else {
            console.error("Item not found:", itemId);
            setItemDetail({ error: "Item tidak ditemukan." });
          }
        } catch (error) {
          console.error("Error fetching item details:", error);
        }
      }
    };

    fetchItemDetails();
  }, []);

  const handleBuyNow = () => {
    if (!user) {
      alert('Silakan login terlebih dahulu untuk membeli barang.');
      return;
    }
    alert('Pembelian berhasil!');
  };

  const handleAddToCart = () => {
    if (itemDetail && user) {
      dispatch({ type: 'ADD_TO_CART', payload: itemDetail });
    } else if (!user) {
      alert('Silakan login terlebih dahulu untuk menambahkan barang ke keranjang.');
    }
  };

  if (!itemDetail) {
    return <p>Loading...</p>;
  }

  return (
    <div className="info">
      {itemDetail.error ? (
        <p>{itemDetail.error}</p>
      ) : (
        <>
          <h2 className="item-name">{itemDetail.name}</h2>
          <img className="item-image" src={itemDetail.image} alt={itemDetail.name} />
          <div className="item-details">
            <p className="condition">Kondisi: {itemDetail.condition}</p>
            <p className="description">Deskripsi: {itemDetail.description}</p>
            <p className="categoryy">Kategori: {itemDetail.category}</p>
            <p className="price">Rp {itemDetail.price}</p>
          </div>
          <div className="button-container">
            <a href="#" onClick={handleBuyNow} className="btn-buy">Beli Sekarang</a>
            <button onClick={handleAddToCart} className="cart-icon-add">
              <FontAwesomeIcon icon={faPlus} className="icon"/>
              <p>Add </p>
              {getItemQuantity() > 0 && <span>({getItemQuantity()})</span>}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default DetailBarangSection;
