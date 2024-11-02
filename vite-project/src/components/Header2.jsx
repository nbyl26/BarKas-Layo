import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import '../assets/styles/Header.css';
import { useCart } from './context/CartContext'; 

function Header2() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { cart } = useCart(); // Ambil data keranjang

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await auth.signOut();
        navigate('/');
    };

    return (
        <div className="header">
            <div className="container">
                <nav>
                    <Link to="/" className="logo">
                        <span>BarKas</span>-Layo
                    </Link>
                    <div className="nav-links">
                        <Link to="/">Beranda</Link>
                        <Link to="/Kategori">Kategori</Link>
                        <Link to="/JualBarang">Jual Barang</Link>
                        <Link to="/TentangKami">Tentang Kami</Link>
                        <Link to="/cart">
                            <i data-feather="shopping-cart"></i> 
                            {cart.length > 0 && <span>({cart.length})</span>} 
                        </Link>
                    </div>
                    <div className="auth-links">
                        {!user ? (
                            <>
                                <Link to="/Login" className="btn-login">Masuk</Link>
                                <Link to="/Register" className="btn-register">Daftar</Link>
                            </>
                        ) : (
                            <Link onClick={handleLogout} className="btn-logout">Logout</Link>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default Header2;
