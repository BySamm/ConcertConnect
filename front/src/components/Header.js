import React, { } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import PropTypes from 'prop-types';

import './Header.css'
 
function Header(props) {
 
    const navigate = useNavigate();
     
    function logMeOut() {
        axios({
            method: "POST",
            url:"http://127.0.0.1:5000/logout",
        })
        .then((response) => {
	console.log(response)			
            props.token()
            localStorage.removeItem('email')
            navigate("/login");
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })
    }
     
    const logged = localStorage.getItem('email');
     
    return(
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <h2><a className="navbar-brand" href="/login">ConcertCo</a></h2>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/login">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="https://example.com">About</a>
                </li>
              </ul>
                {logged? (
                    <button className="btn btn-outline-danger" type="submit" onClick={logMeOut}>Logout</button> ) : null}
            </div>
          </div>
        </nav>
    )
}

Header.propTypes = {
    token: PropTypes.func.isRequired
}
 
export default Header;
