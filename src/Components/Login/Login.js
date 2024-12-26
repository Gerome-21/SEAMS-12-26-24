import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [student_id, setstudent_id] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const student_idPattern = /^\d{2}-\d{4}-\d{3}$/;

    if (!student_id || !password) {
        setError('Please enter both Student ID and Password.');
        return;
    }

    if (!student_idPattern.test(student_id)) {
        setError('Student ID must follow the format: 22-1234-123.');
        return;
    }

    try {
        const response = await axios.post('http://localhost:8081/students/login', {
            student_id,
            password
        });

        if (response.data.success) {
          // Store the student data in localStorage
          const { first_name, last_name, course, yearlevel } = response.data.student;
          localStorage.setItem('student', JSON.stringify({ 
              first_name, 
              last_name, 
              course, 
              yearlevel 
          }));
      
          // Redirect to the student event form
          navigate('/studenteventform');
      } else {
            setError(response.data.message);
        }
    } catch (err) {
        console.error(err);
        setError('An error occurred while logging in. Please try again.');
    }
};

  return (
    <div className='loginpage-box'>
      <div className='loginpage-blue-box'>
        <div className='loginpage-logo'></div>
        <h2 className='loginpage-seamsh2'>SEAMS</h2>
        <h4 className='loginpage-welcomeh4'>
          Welcome to Students Engagement <br />
          and Activity Management System
        </h4>
        <div className='loginpage-lionlogo'></div>
      </div>
      <div className='loginpage-white-box'>
        <div className='loginpage-lccblogo'></div>
        <h2 className='loginpage-loginh2'>Let’s get started.</h2>
        <h4 className='loginpage-loginh4'>Please enter credentials to proceed</h4>

        <form className="loginpage-container" onSubmit={handleSubmit}>
          <input
            type="text"
            id="student_id"
            className="input-id"
            placeholder="Enter Student ID"
            value={student_id}
            onChange={(e) => setstudent_id(e.target.value)}
          />

          <input
            type="password"
            id="password"
            className="input-password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="loginpage-button-1">Login</button>

          <div className='forgot-create-box'>
            <button type="button" className="loginpage-forgot-btn">Forgot password</button>
            <button type="button" className="loginpage-create-btn" onClick={() => navigate('/studentform')}>Create an account</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;