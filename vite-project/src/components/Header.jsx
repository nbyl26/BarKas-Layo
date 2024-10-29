import { Link } from 'react-router-dom'

import '../assets/styles/Header.css'

function Header() {
  return (
    <div className="header">
        <div className="container">
            <nav>
                <div className="logo"><span>BarKas</span>-Layo</div>
                <div className="nav-links">
                    <Link to="/">Beranda</Link>
                    <Link to="/kategori">Kategori</Link>
                    <Link to="/jual-barang">Jual Barang</Link>
                    <Link to="/tentang-kami">Tentang Kami</Link>
                </div>
                <div className="auth-links">
                    <Link to="/login" className="btn-login">Masuk</Link>
                    <Link to="/register" className="btn-register">Daftar</Link>
                </div>
                
            </nav>
            <div className="search-bar">
                    <input type="text" placeholder="Cari barang bekas..." />
                    <button type="button">Cari</button>
            </div>
        </div>
    </div>
  )
}

export default Header
