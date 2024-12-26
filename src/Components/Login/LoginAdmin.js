import React, { useState } from 'react';
import axios from 'axios';
import './LoginAdmin.css';
import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
    const [admin_id, setAdminId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setError(''); // Reset error state
    
        if (!admin_id || !password) {
            setError('Please enter both Admin ID and Password.');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:8081/admins/loginAdmin', {
                admin_id,
                password
            });
    
            if (response.data.success) {
                // Assuming the response contains admin information like admin_id and admin_name
                const { admin_id, admin_name } = response.data.admin;

                // Save admin_id and admin_name to localStorage
                localStorage.setItem('admin_id', admin_id);
                localStorage.setItem('admin_name', admin_name);

                // Redirect to admin dashboard
                navigate('/adminpage');
            } else {
                setError('Invalid Admin ID or Password.');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred while logging in. Please try again.');
        }
    };
    

    return (
        <div className='loginAdminpage-box'>
            <div className='loginAdminpage-blue-box'>
                <div className='loginAdminpage-logo'></div>
                <h2 className='loginAdminpage-seamsh2'>SEAMS</h2>
                <h4 className='loginAdminpage-welcomeh4'>
                    Welcome to Students Engagement <br />
                    and Activity Management System
                </h4>
                <div className='loginAdminpage-lionlogo'></div>
            </div>
            <div className='loginAdminpage-white-box'>
                <div className='loginAdminpage-lccblogo'></div>
                <h2 className='loginAdminpage-loginh2'>Let’s get started.</h2>
                <h4 className='loginAdminpage-loginh4'>Please enter credentials to proceed</h4>

                <form className="loginAdminpage-container" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="admin_id"
                        className="loginAdminpage-input-id"
                        placeholder="Enter Admin ID"
                        value={admin_id}
                        onChange={(e) => setAdminId(e.target.value)}
                    />
                    <input
                        type="password"
                        id="password"
                        className="loginAdminpage-input-password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="loginAdminpage-button-1">Login</button>
                    <div className='forgot-create-box'>
                        <button type="button" className="loginAdminpage-forgot-btn">Forgot password</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginAdmin;
