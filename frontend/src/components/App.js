// frontend/src/components/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavbarComponent from './Navbar';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Common from './Common';
import Table from './Table';
import Image_upd from './Image_upd';
import Marks from './Marks';
import Marksheet from './Marksheet';
import MarksheetView from './MarksheetView';
import axios from '../api/axiosInstance';
import 'bootstrap/dist/css/bootstrap.min.css';
import  '../App.css'
import Footer from './Footer';
const App = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await axios.get('/auth/me'); // You need to create this endpoint
                    setUser(res.data);
                    console.log(res.data)
                } catch (error) {
                    console.error('Failed to fetch user:', error);
                }
            }
        };
        fetchUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <Router>
           
            <div className="container mt-4 bod">
               
                <Routes>
                    <Route path="/" element={<> <NavbarComponent user={user} handleLogout={handleLogout} /><Home user={user}/></>} />
                    <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} />
                    <Route path="/signup" element={!user ? <Signup setUser={setUser} /> : <Navigate to="/" />} />
                    <Route path="/template" element={user ?<><NavbarComponent user={user} handleLogout={handleLogout} /><Common /></>  : <Navigate to="/login" />} />
                    <Route path="/marks/:t_nm" element={user ? <><NavbarComponent user={user} handleLogout={handleLogout} /><Table /></> : <Navigate to="/login" />} />
                    <Route path="/marksheets/:t_nm" element={user ?<><NavbarComponent user={user} handleLogout={handleLogout} /> <Marksheet user={user}/> </>: <Navigate to="/login" />} />
                    <Route path="/images_update" element={user ?<><NavbarComponent user={user} handleLogout={handleLogout} /><Image_upd user={user}/></>  : <Navigate to="/login" />} />

                     
                </Routes>
             
            </div>
            <Footer/>
        </Router>
    );
};
// table compoonent paakanum


//first navbar,css sttyle,more fn(delete,update),pdf download alter.

export default App;

