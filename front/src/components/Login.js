import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

import './Login.css'
import { FaEyeSlash } from 'react-icons/fa'
 
function Login(props) {
      
    const [loginForm, setloginForm] = useState({
      email: "",
      password: ""
    })
 
    const navigate = useNavigate();
     
    function btnlogin(event) {
        axios({
            method: "POST",
            url:"http://127.0.0.1:5000/logintoken",
            data:{
              email: loginForm.email,
              password: loginForm.password
             }
        })
        .then((response) => {
            console.log(response)
            props.setToken(response.data.token)
            alert("Successfully Login");
            localStorage.setItem('email', loginForm.email)
            navigate('/profile');
        }).catch((error) => {
            if (error.response) {
              console.log(error.response)
              console.log(error.response.status)
              console.log(error.response.headers)
                if (error.response.status === 401) {
                    alert("Invalid credentials");
                }
            }
        })
 
        setloginForm(({
            email: "",
            password: ""}))
 
        event.preventDefault()
    }
 
    function handleChange(event) { 
      const {value, name} = event.target
      setloginForm(prevNote => ({
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
                    <p className="lead fw-normal mb-0 me-3">Sign In </p>
                  </div>
  
                  <div className="form-group mb-4">
                    <input type="email" value={loginForm.email} onChange={handleChange} /*text={loginForm.email}*/ name="email" id="email" required/>
                    <label htmlFor="email">Email address</label>
                  </div>
  
              
                  <div className="form-group mb-3">
                    <input type="password" value={loginForm.password} onChange={handleChange} /*text={loginForm.password}*/ name="password" id="password" required/>
                    <label htmlFor="password">Password</label>
	<FaEyeSlash className="icon"/>
                  </div>
  
                  <div className="r d-flex justify-content-between align-items-center">
                    <div className="form-check mb-0">
                      <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                      <label className="form-check-label" htmlFor="form2Example3">
                        Remember me
                      </label>
                    </div>
                    <a href="#!" className="text-body">Forgot password?</a>
                  </div>
  
                  <div className="text-center">
                    <button type="button" className="btn" onClick={btnlogin} >Login</button>
                    <p className="small fw-bold mt-2 pt-1 mb-0">Don have an account?  <Link to="/register" className="link-reg">Register</Link></p>
                  </div>
  
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
   
}

Login.propTypes = {
	setToken: PropTypes.func.isRequired
}

export default Login;
