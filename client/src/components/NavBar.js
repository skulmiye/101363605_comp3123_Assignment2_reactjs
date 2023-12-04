import React from 'react';
import {useNavigate } from 'react-router-dom';
import { useUser } from './Login/UserContext';
import './css/NavBar.css';

const Navbar = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleEmployee = () => {
    navigate('/employee-list');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <nav>
      <h1>Employee Management App</h1>
      <ul>
        {user ? (
          <ul>
            <li><button className="nav-button" onClick={handleEmployee}>Employee List</button></li>
            <li><button className="nav-button" onClick={handleLogout}>Log Out</button></li>
          </ul>
        ) : (
          <ul>
            <li><button className="nav-button" onClick={handleLogin}>Log In</button></li>
            <li><button className="nav-button" onClick={handleSignUp}>Sign Up</button></li>
          </ul>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
