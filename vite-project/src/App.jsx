import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { CartProvider } from './components/cart/CartContext';

import Beranda from './pages/static/Beranda'
import Kategori from './pages/Kategori'
import JualBarang from './pages/barang/JualBarang'
import TentangKami from './pages/static/TentangKami'
import SyaratDanKetentuan from './pages/static/SyaratDanKetentuan'
import KebijakanPrivasi from './pages/static/KebijakanPrivasi'
import KontakKami from './pages/static/KontakKami'
import SemuaBarang from './pages/barang/SemuaBarang'
import DetailBarang from './pages/barang/DetailBarang'
import Register from './pages/auth/Register'
import Login from './pages/auth/LoginPages'
import Cart from './pages/cart/Cart'
import Profil from './pages/profile/AccountProfile'
import FilterPencarian from './pages/filter/FilterPencarianPages';
import KategoriBarangPages from './pages/KategoriBarangPages';
import SearchPage from './pages/filter/SearchPage';
import ChatPages from './pages/chat/ChatPages';
import ChatSection from './pages/chat/Chat';

function App() {
  return (
    <Router>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Beranda />} />
            <Route path="/Kategori" element={<Kategori />} />
            <Route path="/JualBarang" element={<JualBarang />} />
            <Route path="/TentangKami" element={<TentangKami />} />
            <Route path="/SyaratDanKetentuan" element={<SyaratDanKetentuan />} />
            <Route path="/KebijakanPrivasi" element={<KebijakanPrivasi />} />
            <Route path="/KontakKami" element={<KontakKami />} />
            <Route path="/SemuaBarang" element={<SemuaBarang />} />
            <Route path="/DetailBarang" element={<DetailBarang />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Profil" element={<Profil />} />
            <Route path="/Filter" element={<FilterPencarian />} />
            <Route path="/KategoriBarang" element={<KategoriBarangPages />} />
            <Route path="/SearchPage" element={<SearchPage />} />
            <Route path="/Chat" element={<ChatPages />} />
            <Route path="/Chat/:chatId" element={<ChatSection />} />
          </Routes>
        </CartProvider>
    </Router>
  )
}

export default App
