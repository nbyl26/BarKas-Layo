import React from 'react'
import '../assets/styles/Auth.css'
import { registerUserByEmailAndPassword } from '../lib/networks/user';

function Register() {
    var email, password;

    const registerUser = async () => {
        if (email === undefined || email === null || email === "") {
            console.log("Email is empty");
            return;
        }

        if (password === undefined || password === null || password === "") {
            console.log("Password is empty");
            return;
        }
   
        const isRegistered = await registerUserByEmailAndPassword(email, password);

        if (isRegistered !== null && isRegistered !== undefined) {
            console.log("Register success");
        } else {
            console.log("Register failed");
        }
    }


  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Daftar di BarKas-Layo</h2>
        <form className="auth-form">
          <input type="text" placeholder="Nama Lengkap" className="auth-input" required />
          <input type="email" placeholder="Email" className="auth-input" required />
          <input type="password" placeholder="Password" className="auth-input" required />
          <input type="password" placeholder="Konfirmasi Password" className="auth-input" required />
          <button type="submit" className="auth-button">Daftar</button>
        </form>
        <p className="auth-footer-text">
          Sudah punya akun? <a href="/login" className="auth-link">Masuk</a>
        </p>
      </div>
    </div>
  )
}

export default Register;
