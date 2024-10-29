import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Beranda from './pages/Beranda'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Beranda />} />
        
      </Routes>
    </Router>
  )
}

export default App
