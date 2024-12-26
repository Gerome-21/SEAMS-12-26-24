import React, { useEffect, useState } from 'react';
import './StudentProfile.css';
import axios from 'axios';

const StudentProfile = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        studentId: "",
        password: "",
        yearlevel: "",
        course: "",
        facebookName: "",
        gender: "",
        skill: "",
    });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        axios
          .get('/api/student/profile')
          .then((res) => {
              setFormData(res.data);
              setLoading(false); // Set loading to false after data is fetched
          })
          .catch((err) => {
              console.error(err);
              setMessage("Failed to load profile data.");
              setLoading(false); // Set loading to false on error
          });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // handleSubmit is removed as it's not needed
    // Define if you want to add a submission logic in the future

    return (
        <div className='studentprofile-box'>
            <div className='studentprofile-blue-box'>
                <h2 className='studentprofile-welcomeH2'>Welcome Student</h2>
                <h4 className='studentprofile-studentLogin-name'>Gerome Sinoy</h4>
                <h4 className='studentprofile-helloH4'>
                    School of Business and Information Technology
                </h4>
                <div className='studentprofile-optionselect-btn'>
                    <button className='studentprofile-profile-btn' type="button" aria-label="Profile Button">Profile</button>
                    <button className='studentprofile-event-btn' type="button" aria-label="Event Button">Event</button>
                    <button className='studentprofile-sanction-btn' type="button" aria-label="Sanction Button">Sanction</button>
                </div>
                <button className='studentprofile-exit-btn' type="button" aria-label="Exit Button">Exit</button>
            </div>

            <div className='studentprofile-white-box'>
                <div className='studentprofile-txtandlogo-box'>
                    <h2 className='studentprofile-stdnth2'>Student Profile</h2>
                    <div className='studentprofile-lccblogoP2'></div>
                </div>
                {loading ? <p>Loading profile data...</p> : message && <p>{message}</p>}
                <form className="studentprofile-simple-form">
                    {/* All your form fields here, unchanged */}
                </form>
            </div>
        </div>
    );
};

export default StudentProfile;