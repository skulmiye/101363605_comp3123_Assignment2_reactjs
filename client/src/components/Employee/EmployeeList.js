import React, { useState, useEffect } from 'react';
import { useUser } from '../Login/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const { user, logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Login Component - User:', user);
    if (!user) {
      navigate('/login');
    }

    // Fetch the list of employees when the component mounts
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/v1/emp/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, [user]); // Include user in the dependency array

  const handleDelete = async (employeeId) => {
    try {
      await axios.delete(`http://localhost:8082/api/v1/emp/employees?eid=${employeeId}`);
      // Update the employees list after deletion
      setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp._id !== employeeId));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleAdd = () => {
    navigate('/add-employee');
  };

  const handleUpdate = async (employeeId) => {
    navigate(`/update-employee/${employeeId}`);
  }; 
  
  const handleDetails = async (employeeId) => {
    navigate(`/employee-details/${employeeId}`);
  };


  return (
    <div className="employee-list-container">
      <h2 className="employee-list-header">Employee List</h2>
      <button className="add-employee-button"
          onClick={handleAdd}>Add Employee</button>
      <table className="employee-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.email}</td>
              <td>${employee.salary}</td>
              <td>
                <button className='view-employee-button' onClick={() => handleDetails(employee._id)}>View</button>
                <button className='view-employee-button' onClick={() => handleUpdate(employee._id)}>Update</button>
                <button className='del-employee-button' onClick={() => handleDelete(employee._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
