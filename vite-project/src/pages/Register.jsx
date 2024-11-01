// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Auth.css';
import Header2 from '../components/Header2';
import Footer from '../components/Footer';
import { registerUser } from '../auth/authService';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await registerUser(email, password, name);
      alert('Registrasi berhasil! Silakan cek email untuk verifikasi.');
      navigate('/Login');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="auth-page">
      <Header2 />
      <div className="auth-container">
        <div className="auth-box">
          <h2 className="auth-title">SIGN UP</h2>
          <form className="auth-form" onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="auth-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <button type="submit" className="auth-button">Sign Up</button>
          </form>
          {errorMessage && <p className="auth-error">{errorMessage}</p>}
          <p className="auth-footer-text">
            Already have an account? <a href="/Login" className="auth-link">Login</a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
