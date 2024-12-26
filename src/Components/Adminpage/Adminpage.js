import React, { useEffect, useState } from 'react';
import './Adminpage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Adminpage = () => {
    const [adminData, setAdminData] = useState(null); // Holds logged-in admin details
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // Retrieve admin_id from localStorage
    const admin_id = localStorage.getItem('admin_id');

    useEffect(() => {
        if (!admin_id) {
            setError("Admin is not logged in.");
            setLoading(false);
            return;
        }


        // Fetch admin-specific data after login
        axios
            .get('http://localhost:8081/admins/adminpage', {
                params: { admin_id: admin_id } // Pass admin_id as a query parameter
            })
            .then((res) => {
                setAdminData(res.data); // Populate admin data
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching admin data:", err);
                setError("Failed to load admin details.");
                setLoading(false);
            });
    }, [admin_id]);

    // Handle the exit functionality (clearing localStorage and redirecting to login page)
    const handleExit = () => {
        // Remove admin_id and admin_name from localStorage
        localStorage.removeItem('admin_id');
        localStorage.removeItem('admin_name');

        // Redirect to login page
        navigate('/');
    };

    return (
        <div className="Adminpage-mainbox">
            {/* Sidebar Section */}
            <div className="Adminpage-sidebar">
                <div className="Adminpage-logo">
                    <div className="Adminpage-seamslogo"></div>
                    <h2 className="Adminpage-seams-txt">SEAMS</h2>
                </div>

                <div className="Adminpage-adminbox">
                    <div className="Adminpage-adminimage"></div>
                    <h2 className="Adminpage-adminNameH2">
                      Admin  {adminData ? adminData.admin_name : "Admin"} {/* Use admin_name here */}
                    </h2>
                </div>

                <div className="Adminpage-menu">
                    <button onClick={() => navigate('/courselist')}>COURSE</button>
                    <button onClick={() => navigate('/eventlist')}>EVENT</button>
                    <button>SANCTION</button>
                    <button>DATABASE</button>
                </div>

                <div className="Adminpage-exit">
                    <div className="Adminpage-exitimg"></div>
                    <button onClick={handleExit}>EXIT</button>
                </div>
            </div>

            {/* Content Section */}
            <div className="Adminpage-leftcont-box">
                <div className="Adminpage-logoboxlcc">
                    <div className="Adminpage-lccBlogo"></div>
                </div>
                <div className="Adminpage-content">
                    <h2 className="Adminpage-adminnameH2">
                        Welcome, Admin {adminData ? adminData.admin_name : "Admin"}! {/* Use admin_name here */}
                    </h2>
                    {loading && <p>Loading your data...</p>}
                    {error && <p className="error-message">{error}</p>}
                    {!loading && !error && (
                        <div className="Adminpage-summary">
                            {/* <h3>Today's Overview</h3>
                            <p>Total Events: {adminData?.eventCount ?? 0}</p>
                            <p>Total Sanctions Issued: {adminData?.sanctionCount ?? 0}</p>
                            <p>Active Users: {adminData?.userCount ?? 0}</p> */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Adminpage;
