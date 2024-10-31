const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

// Inisialisasi Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Endpoint untuk mengirim email verifikasi
app.post('/send-verification-email', (req, res) => {
  const { email } = req.body;

  const msg = {
    to: email,
    from: 'your-email@example.com', // Ganti dengan email pengirim yang telah diverifikasi
    subject: 'Verifikasi Email',
    text: 'Silakan klik tautan berikut untuk memverifikasi email Anda.',
    html: `<strong>Silakan klik tautan berikut untuk memverifikasi email Anda.</strong>`,
  };

  sgMail
    .send(msg)
    .then(() => {
      res.status(200).json({ message: 'Email verifikasi berhasil dikirim' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Gagal mengirim email' });
    });
});

// Mulai server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
