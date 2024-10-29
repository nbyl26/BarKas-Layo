import React, { useEffect } from 'react';
import '../assets/styles/KontakKamiSection.css';

function KontakKamiSection() {
  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Pesan telah dikirim!'); 
  };

  return (
    <section id="contact" className="contact">
      <h2><span>Kontak</span> Kami</h2>
      <p></p>

      <div className="row">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.51998443043!2d104.649007475345!3d-3.219816546755316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3bbdf1ba5ade17%3A0xec8169998ecd82bc!2sFakultas%20Ilmu%20Komputer%20UNSRI%20Indralaya!5e0!3m2!1sid!2sid!4v1730218580581!5m2!1sid!2sid"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        <form id="contact-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <i data-feather="user"></i>
            <input type="text" name="nama" placeholder="Nama" required />
          </div>
          <div className="input-group">
            <i data-feather="mail"></i>
            <input type="email" name="email" placeholder="Email" required />
          </div>
          <div className="input-group">
            <i data-feather="phone"></i>
            <input type="text" name="nohp" placeholder="No HP" required />
          </div>
          <div className="input-group">
            <i data-feather="message-square"></i>
            <textarea name="pesan" id="pesan" rows="3"  required></textarea>
          </div>
          <button type="submit" className="btn">Kirim Pesan</button>
        </form>
      </div>
    </section>
  );
}

export default KontakKamiSection;
