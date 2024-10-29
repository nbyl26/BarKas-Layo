import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Beranda from './pages/Beranda'
import Kategori from './pages/Kategori'
import JualBarang from './pages/JualBarang'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/Kategori" element={<Kategori />} />
        <Route path="/JualBarang" element={<JualBarang />} />
        
      </Routes>
    </Router>
  )
}

export default App
