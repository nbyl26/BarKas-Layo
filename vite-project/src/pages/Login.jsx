import React from 'react'
import '../assets/styles/Auth.css'
import Header2 from '../components/Header2'
import Footer from '../components/Footer'

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
      <div className="auth-page">
      
      <Header2 />

      <div className="auth-container">
        <div className="auth-box">
          <h2 className="auth-title">SIGN IN</h2>
          <form className="auth-form">
            <input type="email" placeholder="Email" className="auth-input" required />
            <input type="password" placeholder="Password" className="auth-input" required />
            <button type="submit" className="auth-button">Log In</button>
          </form>
          <p className="auth-footer-text">
            Don't have an account? <a href="/Register" className="auth-link">Sign Up</a>
          </p>
        </div>
      </div>

      <Footer />
      
    </div>
  )
}

export default Login;
