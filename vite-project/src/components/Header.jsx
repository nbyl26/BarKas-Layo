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
                    <Link to="/Kategori">Kategori</Link>
                    <Link to="/JualBarang">Jual Barang</Link>
                    <Link to="/TentangKami">Tentang Kami</Link>
                </div>
                <div className="auth-links">
                    <Link to="/Login" className="btn-login">Masuk</Link>
                    <Link to="/Register" className="btn-register">Daftar</Link>
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
