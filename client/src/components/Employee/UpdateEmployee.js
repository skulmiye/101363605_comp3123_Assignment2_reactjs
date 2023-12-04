import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../Login/UserContext';
import {useParams, useNavigate } from 'react-router-dom';
import '../css/UpdateEmployee.css';

const UpdateEmployee = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [employee, setEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    salary: '',
  });

  const { eid } = useParams();

  useEffect(() => {
    console.log('Login Component - User:', user);
    if (!user) {
      navigate('/login');
    }

    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/v1/emp/employees/${eid}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    fetchEmployeeDetails();
  }, [eid]);

  const handleInputChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateEmployee = async () => {
    try {
      const response = await axios.put(`http://localhost:8082/api/v1/emp/employees/${eid}`, employee);
      console.log('Update response:', response);
      navigate('/employee-list');
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  if (!employee) {
    // Display loading or error message if employee data is not available yet
    return <p>Loading employee details...</p>;
  }

  const handleCancel = () => {
    navigate('/employee-list');
  };

  return (
    <div className="update-employee-container">
      <h2>Update Employee</h2>
      <div className="update-employee-form">
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={employee.first_name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={employee.last_name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={employee.email} onChange={handleInputChange} />
        </div>
        <div>
          <label>Gender:</label>
          <input type="text" name="gender" value={employee.gender} onChange={handleInputChange} />
        </div>
        <div>
          <label>Salary:</label>
          <input
            type="number"
            name="salary"
            value={employee.salary}
            onChange={handleInputChange}
          />
        </div>
        <button className='update-button'
          onClick={handleUpdateEmployee}>Update Employee</button>
        <button className="cancel-button" 
            onClick={handleCancel}>Cancel</button>
        </div>
    </div>
  );
};

export default UpdateEmployee;
