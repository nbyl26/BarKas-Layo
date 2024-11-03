import React, { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import Header2 from "../components/Header2"
import CartSection from "../components/CartSection"
import Footer from "../components/Footer"

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
    <>
    <Header2 />
    <CartSection />
    <Footer />
    
    </>
  )
}

export default Cart
