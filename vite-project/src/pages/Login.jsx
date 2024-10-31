import React from 'react'
import '../assets/styles/Auth.css'
import { getAllUsers, loginUserByEmailAndPassword } from '../lib/networks/user'


function Login() {
    var email, password;

    const loginUser = async () => {
        const isLogin = await loginUserByEmailAndPassword(email, password);

        if (isLogin !== null && isLogin !== undefined) {
            console.log("Login success");
        } else {
            console.log("Login failed");
        }
    }
    
    return (
      <div className="auth-container">
      <div className="auth-glass">
        <h2 className="auth-title">Masuk ke BarKas-Layo</h2>
        <form className="auth-form">
          <input type="email" placeholder="Email" className="auth-input" required />
          <input type="password" placeholder="Password" className="auth-input" required />
          <button type="submit" className="auth-button">Masuk</button>
        </form>
        <p className="auth-footer-text">
          Belum punya akun? <a href="/register" className="auth-link">Daftar Sekarang</a>
        </p>
      </div>
    </div>
  )
}

export default Login;
