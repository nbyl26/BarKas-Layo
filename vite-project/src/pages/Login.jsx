import React from 'react'
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
        <div>
            <h1>Login</h1>
            <input type="text" placeholder="Email" onChange={(e) => email = e.target.value} />
            <input type="password" placeholder="Password" onChange={(e) => password = e.target.value} />
            <button onClick={loginUser}>Login</button>
        </div>
  )
}

export default Login
