import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Auth/Auth.css';
import Header2 from '../components/header/Header2';
import Footer from '../components/auth/FooterAuth';
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
      <div className="auth-page">
        <Header2 />
        <div className="auth-container">
          <div className="auth-box">
            <h2 className="auth-title">Register</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form className="auth-form" onSubmit={handleRegister}>
              <input
                type="text"
                placeholder="Nama Lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="auth-input"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
                required
              />
              <input
                type="password"
                placeholder="Konfirmasi Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="auth-input"
                required
              />
              <button type="submit" className="auth-button">Daftar</button>
            </form>
            <p className="auth-footer-text">
              Already have an account? <a href="/Login" className="auth-link">Login</a>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Register;
