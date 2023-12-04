import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { UserProvider} from './components/Login/UserContext';
import Login from './components/Login/Login';
import SignUp from './components/Signup/SignUp';
import EmployeeList from './components/Employee/EmployeeList';
import AddEmployee from './components/Employee/AddEmployee';
import UpdateEmployee from './components/Employee/UpdateEmployee';
import EmployeeDetails from './components/Employee/EmployeeDetails';
import Navbar from './components/NavBar';

function App() {
  return (
    <UserProvider>
      <Router>
        <nav>
          <Navbar/>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/employee-list" element={<EmployeeList />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/update-employee/:eid" element={<UpdateEmployee />} />
          <Route path="/employee-details/:eid" element={<EmployeeDetails />} />
          {/* Other routes... */}
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;

