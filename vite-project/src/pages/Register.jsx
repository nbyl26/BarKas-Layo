import React from 'react'
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
    <div>
        <h1>Register</h1>
        <input type="text" placeholder="Email" onChange={(e) => email = e.target.value} />
        <input type="password" placeholder="Password" onChange={(e) => password = e.target.value} />
        <button onClick={registerUser}>Register</button>
    </div>
  )
}

export default Register
