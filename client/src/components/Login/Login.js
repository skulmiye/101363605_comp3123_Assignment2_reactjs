import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useUser } from './UserContext';
import '../css/Login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const { user, login } = useUser();
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if the user is already logged in
    console.log('Login Component - User:', user);
    if (user) {
      navigate('/employee-list');
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8082/api/v1/user/login', {
        usernameOrEmail,
        password,
      });

      login(response.data);

      localStorage.setItem('user', JSON.stringify(response.data));
      setError('');
      navigate('/employee-list');
    } catch (error) {
      console.error('Axios error:', error);
      setError('Invalid username/email or password');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className='body'>
      <div className='login-container'>
      <h2>Login</h2>
      {!user ? (
        <>
        <div className='form'>
          <div className="login-input">
            <label>Username/Email:</label>
            <input
              type="text"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
            />
          </div>
          <div className="login-input">
            <label>Password:</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="password-toggle" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          {error && <p className='error-message'>{error}</p>}
          <button className='login-button' onClick={handleLogin}>Login</button>
          <p className='link-to-signup'>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
        </>
      ) : (
        <Navigate to="/employee-list" />
      )}
      </div>
    </div>
  );
};

export default Login;

