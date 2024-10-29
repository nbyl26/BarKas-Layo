import React, { useEffect } from 'react'
import feather from 'feather-icons'
import '../assets/styles/Footer.css'

function Footer() {
  useEffect(() => {
    feather.replace() // Inisialisasi ikon Feather setiap kali komponen dirender
  }, [])

  return (
    <div className="footer">
      <div className="container">
        <div className="footer-links">
          <a href="/tentang-kami">Tentang Kami</a>
          <a href="/syarat-dan-ketentuan">Syarat dan Ketentuan</a>
          <a href="/kebijakan-privasi">Kebijakan Privasi</a>
          <a href="/kontak-kami">Kontak Kami</a>
        </div>
        <p>&copy; 2024 @BarKas-Layo. Hak Cipta Dilindungi.</p>
      </div>
      <div className="socials">
        <a href="https://www.instagram.com/nbyl.26"><i data-feather="instagram"></i></a>
        <a href="https://github.com/nbyl26"><i data-feather="github"></i></a>
        <a href="https://www.linkedin.com/in/nabilpasha"><i data-feather="linkedin"></i></a>
      </div>
    </div>
  )
}

export default Footer
