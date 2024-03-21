import React from 'react'
import './Login.css'
import { MdOutlineEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
export const Login = () => {
  return (
    <div className='my-container'>
       <div className="wrapper">
    <form action="">
        <h1>Login</h1>
        <div className="input-box">
        <div className='input'>
            <input type="email" placeholder='Email' required/>
            <MdOutlineEmail className='icon'/>
        </div>
        <div className="password-box">
            <input type="password" placeholder='Password' />
            <FaLock className='icon'/>
        </div>
        </div>
      
        <div className="forgot">
            <a href="#">Forgot Password</a>
        </div>
        <button type='submit'>Login</button>
       <div className="register">
        <p>Don't have an account? <a href='#'>Register</a> </p>
       </div>
    </form>
  </div>
    </div>
 
  )
}
