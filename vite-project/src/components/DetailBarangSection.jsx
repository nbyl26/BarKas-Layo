import React, { useEffect, useState } from 'react';
import '../assets/styles/DetailBarangSection.css';
import { useCart } from './context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import Cookies from 'js-cookie';

import imgLaptop from '../assets/img/laptop.png';
import imgSepeda from '../assets/img/bicycle.png';
import imgLemari from '../assets/img/cupboard.png';

function DetailBarangSection() {

  const [user, setUser] = useState(null);

    // Memeriksa status login pengguna
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    // Fungsi untuk menangani klik pada tombol beli
    const handleBuyNow = () => {
        if (!user) {
            alert('Silakan login terlebih dahulu untuk membeli barang.');
            return;
        }
        // Logika untuk membeli barang
        alert('Pembelian berhasil!');
    };

  const [itemDetail, setItemDetail] = useState(null);
  const { cart, dispatch } = useCart();
  useEffect(() => {
    displayItemDetails();
  }, []);

  const displayItemDetails = () => {
    const params = new URLSearchParams(window.location.search);
    const item = params.get('item');

    const itemDetails = {
      laptop: {
        id: 'laptop',
        name: "Laptop Bekas",
        condition: "Kondisi: Baik, masih lancar",
        description: "Deskripsi: Laptop ini cocok untuk penggunaan sehari-hari, ideal untuk mahasiswa dan pekerja.",
        category: "Kategori: Elektronik",
        price: "Rp 3.500.000",
        image: imgLaptop
      },
      sepeda: {
        id: 'sepeda',
        name: "Sepeda Gunung",
        condition: "Jarang Dipake, Like New",
        description: "Deskripsi: Sepeda Gunung sangat cocok untuk yang hobi mendaki gunung menggunakan sepeda",
        category: "Kategori: Kendaraan",
        price: "Rp 2.200.000",
        image: imgSepeda
      },
      lemari: {
        id: 'lemari',
        name: "Lemari Kayu Jati",
        condition: "Kondisi: Sangat baik, hampir baru",
        description: "Deskripsi: Lemari ini terbuat dari kayu jati, sangat kokoh dan luas.",
        category: "Kategori: Furnitur",
        price: "Rp 5.200.000",
        image: imgLemari
      },
    };

    const detail = itemDetails[item];

    if (detail) {
      setItemDetail(detail);
    } else {
      console.error("Item not found:", item);
      setItemDetail({ error: "Item tidak ditemukan." });
    }
  };

  const handleAddToCart = () => {
    if (itemDetail && user) {
      dispatch({ type: 'ADD_TO_CART', payload: itemDetail });
    }
    else if (!user) {
      alert('Silakan login terlebih dahulu untuk menambahkan barang ke keranjang.');
      return;
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
            <p className="condition">{itemDetail.condition}</p>
            <p className="description">{itemDetail.description}</p>
            <p className="category">{itemDetail.category}</p>
            <p className="price">{itemDetail.price}</p>
          </div>
          <div className="button-container">
            <a href="#" onClick={handleBuyNow} className="btn-buy">Beli Sekarang</a>
            <button onClick={handleAddToCart} className="cart-icon-add">
              <FontAwesomeIcon icon={faShoppingCart} />
              {cart.length > 0 && <span>({cart.length})</span>}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default DetailBarangSection;
