import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Beranda from './pages/Beranda'
import Kategori from './pages/Kategori'
import JualBarang from './pages/JualBarang'
import TentangKami from './pages/TentangKami'
import SyaratDanKetentuan from './pages/SyaratDanKetentuan'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/Kategori" element={<Kategori />} />
        <Route path="/JualBarang" element={<JualBarang />} />
        <Route path="/TentangKami" element={<TentangKami />} />
        <Route path="/SyaratDanKetentuan" element={<SyaratDanKetentuan />} />
        
      </Routes>
    </Router>
  )
}

export default App
