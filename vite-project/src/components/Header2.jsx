import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import '../assets/styles/Header.css';

function Header() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

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

export default Header;
