import React, { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import Header2 from "../components/header/Header2"
import CartSection from "../components/cart/CartSection"
import Footer from "../components/Footer"
import '../assets/styles/Cart/Cart.css'

function Cart() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        alert('Silakan login terlebih dahulu untuk mengakses halaman ini.');
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="cart-pages-container">
      <div className="main-content">
        <Header2 />
        <CartSection />
      </div>
      <Footer />
    </div>
  )
}

export default Cart
