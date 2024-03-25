import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import PropTypes from 'prop-types';
import '../assets/vendor/bootstrap-icons/bootstrap-icons.css'
 
function NavBar(props) {
 
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

    const [navbar, setnav] = useState(false);
	const changeBackground = () => {
		if(window.scrollY >= 50) {
			setnav(true);
		}
		else {
			setnav(false);
		}
	}
	window.addEventListener('scroll', changeBackground);
     
    const logged = localStorage.getItem('email');
     
    return(
	<>

<header id="header">
		<div className="con d-flex align-items-center">
	
		<h1 className="logo me-auto"><a href="index.html">ConcertCo</a></h1>
	
		<nav id="navbar" className={navbar ? "navbar active" : "navbar"}>
			<ul>
			<li><a className="nav-link scrollto active" href="#hero">Home</a></li>
			<li><a className="nav-link scrollto" href="#feature">Features</a></li>
			<li><a className="nav-link scrollto" href="#about">About</a></li>
			
			<li>
        {logged? (
          <button className="getstarted scrollto" type="submit" onClick={logMeOut}>Logout</button> ) : null}
        </li>
			</ul>
			<i className="bi bi-list mobile-nav-toggle"></i>
		</nav>
	
		</div>
	</header>

		</>
    )
}

NavBar.propTypes = {
	token: PropTypes.func.isRequired
}
 
export default NavBar;
