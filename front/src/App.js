import React, { } from 'react';
import './App.css';
   
import { BrowserRouter, Routes, Route } from 'react-router-dom';
 
import Login from './components/Login';
import Header from './components/Header';
import Profile from './components/Profile';
import useToken from './components/useToken';
import Register from './components/Register';

function App() {
     
    const { token, removeToken, setToken } = useToken();
     
    return (
        <div className="vh-100 gradient-custom">
	{/*<div className="container">*/}
               <BrowserRouter>
                    <Header token={removeToken}/> 
                    <Routes>
                        <Route exact path="/profile" element={<Profile token={token} setToken={setToken}/>}></Route>
                        <Route exact path="/register" element={<Register setToken={setToken} />}></Route>
                        <Route exact path="/login" element={<Login setToken={setToken} />}></Route>
                    </Routes>
                </BrowserRouter>
	{/*</div>*/}
        </div>
    );
}

export default App;

