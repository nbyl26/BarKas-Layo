import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Auth.css';
import Header2 from '../components/Header2';
import Footer from '../components/Footer';
import { registerUser } from '../auth/authService';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      await registerUser(email, password, name);
      alert('Registrasi berhasil! Silakan Klik Ok untuk Login.');
      navigate('/Login'); 
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <Header2 />
      <div className="auth-container">
        <h2>Register</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nama Lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Konfirmasi Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Daftar</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Register;
