import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../Login/UserContext';
import { useNavigate } from 'react-router-dom';
import '../css/AddEmployee.css';


const AddEmployee = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { user, logout } = useUser();
  const [employeeData, setEmployeeData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    salary: '',
  });

  useEffect(() => {
    console.log('Login Component - User:', user);
    if (!user) {
      navigate('/login');
    }
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddEmployee = async () => {
    try {
      const response = await axios.post('http://localhost:8082/api/v1/emp/employees', employeeData);
      console.log('Employee added successfully:', response.data);
      navigate('/employee-list');
    } catch (error) {
      console.error('Error adding employee:', error);
      setError('Invalid Input');
    }
  };

  const handleCancel = () => {
    navigate('/employee-list');
  };

  return (
    <div className='body'>
      <div className="add-employee-container">
        <h2>Add Employee</h2>
        <div className="add-employee-form">
          <label>First Name:</label>
          <input type="text" name="first_name" value={employeeData.first_name} onChange={handleChange} />
        </div>
        <div className="add-employee-form">
          <label>Last Name:</label>
          <input type="text" name="last_name" value={employeeData.last_name} onChange={handleChange} />
        </div>
        <div className="add-employee-form">
          <label>Email:</label>
          <input type="text" name="email" value={employeeData.email} onChange={handleChange} />
        </div>
        <div className="add-employee-form">
          <label>Gender:</label>
          <input type="text" name="gender" value={employeeData.gender} onChange={handleChange} />
        </div>
        <div className="add-employee-form">
          <label>Salary:</label>
          <input type="text" name="salary" value={employeeData.salary} onChange={handleChange} />
        </div>
        {error && <p className='error-message'>{error}</p>}
        <div className="add-employee-form">
      </div>
      <button className="add-employee-button" 
          onClick={handleAddEmployee}>Add Employee</button>
        <button className="cancel-button" 
          onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default AddEmployee;
