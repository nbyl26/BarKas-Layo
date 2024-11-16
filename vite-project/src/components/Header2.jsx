import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import '../assets/styles/Header/Header.css';
import { useCart } from './cart/CartContext';

function Header() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { cart, dispatch } = useCart();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await auth.signOut();
        setUser(null);
        dispatch({ type: 'CLEAR_CART' });
        navigate('/');
    };

    const isLoginOrRegisterPage = window.location.pathname === '/Login' || window.location.pathname === '/Register';

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
                    </div>
                    <div className="auth-links">
                        <Link to="/Chat" className="chat-icon">
                            <i data-feather="message-square"></i>
                        </Link>

                        <Link to="/cart" className="cart-icon">
                            <i data-feather="shopping-cart"></i>
                            {cart.length > 0 && <span>({cart.length})</span>}
                        </Link>

                        <Link to="/Profil" className="user">
                            <i data-feather="user"></i>
                        </Link>
                        {user && !isLoginOrRegisterPage ? (
                            <>
                                <Link onClick={handleLogout} className="btn-logout">Logout</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/Login" className="btn-login">Masuk</Link>
                                <Link to="/Register" className="btn-register">Daftar</Link>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default Header;
