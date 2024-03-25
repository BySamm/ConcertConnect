import React, {useState} from "react";
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

	const [isMobile, setIsMobile] = useState(false)
     
    return(
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
           <a className="navbar-brand" href="/login">ConcertCo</a>
           
           <button className="navbar-toggler navbar-toggler-right collapsed" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setIsMobile(!isMobile)}>
           {isMobile ? (
       <span className="my-1 mx-2 close">X</span> ) : ( <span className="navbar-toggler-icon"></span> )}
    </button>
            
              <ul className={isMobile? "navbar-nav-mobile" : "navbar-nav"} onClick={() => setIsMobile(false)}>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/login">Discover</a>
                </li>

	<li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/login">Statistics</a>
                </li>

	<li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/login">Concerts</a>
                </li>


                <li className="nav-item">
                  <a className="nav-link" href="https://example.com">Recent</a>
                </li>
              <li className="nav-item">
                {logged? (
                    <button className="btn btn-outline-danger" type="submit" onClick={logMeOut}>Logout</button> ) : null}
                    </li>
	</ul>
          </div>
        </nav>
    )
}

Header.propTypes = {
    token: PropTypes.func.isRequired
}
 
export default Header;
