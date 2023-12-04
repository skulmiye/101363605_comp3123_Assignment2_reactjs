import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../css/SignUp.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:8082/api/v1/user/signup', {
        username,
        email,
        password,
      });

      setError('');
      console.log('User created successfully:', response.data);
      navigate('/login');
    } catch (error) {
      setError('Error creating user');
      console.error(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };


  return (
    <div className="body">
      <div className="signup-container">
      <h2>Sign Up</h2>
      <div className='form'>
        <div className="signup-input">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="signup-input">
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="signup-input">
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
        <button className="signup-button" onClick={handleSignUp}>Sign Up</button>
        <p className='link-to-login'>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
      </div>
    </div>
  );
};


export default SignUp;