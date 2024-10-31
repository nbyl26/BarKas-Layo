import React from 'react'
import '../assets/styles/Auth.css'
import Header2 from '../components/Header2'
import Footer from '../components/Footer'

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
    <div className="auth-page">

      <Header2 />

      <div className="auth-container">
        <div className="auth-box">
          <h2 className="auth-title">SIGN UP</h2>
          <form className="auth-form">
            <input type="text" placeholder="Enter Your Name" className="auth-input" required />
            <input type="email" placeholder="Enter Your Email" className="auth-input" required />
            <input type="password" placeholder="Create Password" className="auth-input" required />
            <input type="password" placeholder="Confirm Password" className="auth-input" required />
            <button type="submit" className="auth-button">Sign Up</button>
          </form>
          <p className="auth-footer-text">
            Already have an account? <a href="/Login" className="auth-link">Login</a>
          </p>
        </div>
      </div>

      <Footer />

    </div>
  )
}

export default Register;
