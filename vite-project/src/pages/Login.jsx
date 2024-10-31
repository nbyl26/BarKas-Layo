import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import '../assets/styles/Auth.css';
import Header2 from '../components/Header2';
import Footer from '../components/Footer';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { user, error } = await supabase.auth.signIn({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      alert('Login berhasil!');
      navigate('/'); // Arahkan ke halaman beranda setelah login
    }
  };

  return (
    <div className="auth-page">
      <Header2 />
      <div className="auth-container">
        <div className="auth-box">
          <h2 className="auth-title">LOGIN</h2>
          <form className="auth-form" onSubmit={handleLogin}>
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
            <button type="submit" className="auth-button">Login</button>
          </form>
          {errorMessage && <p className="auth-error">{errorMessage}</p>}
          <p className="auth-footer-text">
            Don't have an account? <a href="/Register" className="auth-link">Register</a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
