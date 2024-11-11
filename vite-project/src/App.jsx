import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { CartProvider } from './components/context/CartContext';

import Beranda from './pages/Beranda'
import Kategori from './pages/Kategori'
import JualBarang from './pages/JualBarang'
import TentangKami from './pages/TentangKami'
import SyaratDanKetentuan from './pages/SyaratDanKetentuan'
import KebijakanPrivasi from './pages/KebijakanPrivasi'
import KontakKami from './pages/KontakKami'
import SemuaBarang from './pages/SemuaBarang'
import DetailBarang from './pages/DetailBarang'
import Register from './pages/Register'
import Login from './pages/LoginPages'
import Cart from './pages/Cart'
import Profil from './pages/AccountProfile'
import FilterPencarian from './pages/FilterPencarianPages';
import KategoriBarang from './pages/KategoriBarang';
import SearchPage from './pages/SearchPage';
import Chat from './pages/Chat';

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
          <Route path="/KategoriBarang" element={<KategoriBarang />} />
          <Route path="/SearchPage" element={<SearchPage />} />
          <Route path="/Chat" element={<Chat />} />
        </Routes>
      </CartProvider>
    </Router>
  )
}

export default App
