import React, { useEffect } from 'react'
import feather from 'feather-icons'
import '../../assets/styles/Footer/FooterAuth.css'

function FooterAuth() {
  useEffect(() => {
    feather.replace() 
  }, [])

  return (
    <div className="footer-auth">
      <div className="container">
        <div className="footer-auth-links">
          <a href="/TentangKami">Tentang Kami</a>
          <a href="/SyaratDanKetentuan">Syarat dan Ketentuan</a>
          <a href="/KebijakanPrivasi">Kebijakan Privasi</a>
          <a href="/KontakKami">Kontak Kami</a>
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

export default FooterAuth
