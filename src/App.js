import './components/Wrapper/Wrapper.css';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Pages/Home/Home';
import Products from './components/Pages/Products/Products';
import About from './components/Pages/AboutUs/AboutUs';
import Contact from './components/Pages/ContactUs/ContactUs';
import ShoppingCart from './components/Pages/ShoppingCart/ShoppingCart';
import Login from './components/Pages/Login/Login'; 
import Verify from './components/Pages/Login/Verify';
import Dashboard from './components/Pages/Login/Dashboard';
import Favorites from './components/Pages/Login/Favorites';
import UserProfile from './components/Pages/Login/UserProfile';
import Orders from './components/Pages/Login/Orders';

const App = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState({ name: 'کاربر', lastName: 'نمونه' });

  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const [authToken, setAuthToken] = useState("");

  const handleLoginSuccess = (token, status) => {
    setAuthToken(token);
    setIsLoginOpen(false); 
    setIsVerifyOpen(true); 
  };
  const updateUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  return (
    <>
      <Routes>
        <Route 
          exact path='/' element={<Home openLogin={() => setIsLoginOpen(true)} />} 
        />
        <Route exact path='/Products' element={<Products />} />
        <Route exact path='/About' element={<About />} />
        <Route exact path='/Contact' element={<Contact />} />
        <Route exact path='/ShoppingCart' element={<ShoppingCart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/favorites" element={<Favorites />} />
        <Route path="/Orders" element={<Orders />} />

        <Route path="/UserProfile" element={<UserProfile updateUser={updateUser} />} />


      </Routes>
      
      {isLoginOpen && (
        <Login 
          isOpen={isLoginOpen} 
          onClose={() => setIsLoginOpen(false)} 
          onLoginSuccess={handleLoginSuccess} 
        />
      )}
      
    </>
  );
};

export default App;
