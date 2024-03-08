import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

import './Login.css'
import { FaEyeSlash } from 'react-icons/fa'
 
function Register(/*props*/) {
      
    const [registerForm, setregisterForm] = useState({
	username: "",
      email: "",
      password: ""
    })
 
    const navigate = useNavigate();
     
    function btnregister(event) {
	if (!registerForm.password.trim()) {
		alert("Please enter a password");
		return;
	}

        axios({
            method: "POST",
            url:"http://127.0.0.1:5000/register",
            data:{
	username: registerForm.username,
              email: registerForm.email,
              password: registerForm.password
             }
        })
        .then((response) => {
            console.log(response)
		{/*props.setToken(response.data.token)*/}
            alert("Successfully Registered");
		{/*localStorage.setItem('email', loginForm.email)*/}
            navigate('/login');
        }).catch((error) => {
            if (error.response) {
              console.log(error.response)
              console.log(error.response.status)
              console.log(error.response.headers)
                if (error.response.status === 409) {
                    alert("Email already exists");
                }
            }
        })
 
        setregisterForm(({
		username: "",
            email: "",
            password: ""}))
 
        event.preventDefault()
    }
 
    function handleChange(event) { 
      const {value, name} = event.target
      setregisterForm(prevNote => ({
          ...prevNote, [name]: value})
      )}
 
    /*let imgs = [
      'https://as1.ftcdn.net/v2/jpg/03/39/70/90/1000_F_339709048_ZITR4wrVsOXCKdjHncdtabSNWpIhiaR7.jpg',
    ];*/
     
    return (
    <div>
        <div className="container h-50">
          <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-50">
              <div className="wrapper col-md-6 col-lg-6 col-xl-4">
                <form>
                  <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                    <p className="lead fw-normal mb-0 me-3">Sign Up </p>
                  </div>

	<div className="form-group mb-4">
                    <input type="text" value={registerForm.username} onChange={handleChange} /*text={loginForm.email}*/ name="username" id="username" required/>
                    <label htmlFor="username">Username</label>
                  </div>

  
                  <div className="form-group mb-4">
                    <input type="email" value={registerForm.email} onChange={handleChange} /*text={loginForm.email}*/ name="email" id="email" required/>
                    <label htmlFor="email">Email address</label>
                  </div>
  
              
                  <div className="form-group mb-3">
                    <input type="password" value={registerForm.password} onChange={handleChange} /*text={loginForm.password}*/ name="password" id="password" required/>
                    <label htmlFor="password">Password</label>
	<FaEyeSlash className="icon"/>
                  </div>
  
                    <div className="text-center">
                    <button type="button" className="btn" onClick={btnregister} >Register</button>
                  </div>
  
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
   
}

Register.propTypes = {
	setToken: PropTypes.func.isRequired
}

export default Register;
