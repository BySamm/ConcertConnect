import React, { } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Landing from './components/Landing';
import Profile from './components/Profile';
import useToken from './components/useToken';
import Register from './components/Register';
import NavBar from './components/NavBar';

function App() {
     
    const { token, removeToken, setToken } = useToken();
     
    return (
	<div className="vh-100 gradient-custom">
               <BrowserRouter>
                    <NavBar token={removeToken}/> 
                    <Routes>
                        <Route exact path="/profile" element={<Profile token={token} setToken={setToken}/>}></Route>
                        <Route exact path="/register" element={<Register setToken={setToken} />}></Route>
                        <Route exact path="/login" element={<Login setToken={setToken} />}></Route>
                        <Route exact path="/" element={<Landing setToken={setToken} />}></Route>
                    </Routes>
                </BrowserRouter>
	</div>
    );
}

export default App;

