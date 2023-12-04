import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../Login/UserContext';
import { useParams, useNavigate} from 'react-router-dom';
import '../css/EmployeeDetails.css';

const EmployeeDetails = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const { eid } = useParams();
  const [error, setError] = useState('');
  const { user, logout } = useUser();

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
        setError('Error fetching employee details');
      }
    };

    fetchEmployeeDetails();
  }, [eid]);

  if (!employee) {
    // Display loading or error message if employee data is not available yet
    return <p>Loading employee details...</p>;
  }

  const handleBackToList = () => {
    navigate('/employee-list');
  };

  return (
    <div className="employee-details-container">
      <h2>View Employee Details</h2>
      <div className="employee-details-content">
        <p>
          <strong>First Name:</strong> {employee.first_name}
        </p>
        <p>
          <strong>Last Name:</strong> {employee.last_name}
        </p>
        <p>
          <strong>Email:</strong> {employee.email}
        </p>
        <p>
          <strong>Gender:</strong> {employee.gender}
        </p>
        <p>
          <strong>Salary:</strong> {employee.salary}
        </p>
        <button className="back-link" 
          onClick={handleBackToList}>Back to Employee List</button>
      </div>
    </div>
  );
};

export default EmployeeDetails;