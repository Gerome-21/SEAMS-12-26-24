import React, { useState } from 'react';
import './Studentform.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Studentform = () => {
    const [first_name, setfirst_name] = useState('');
    const [last_name, setlast_name] = useState('');
    const [student_id, setstudent_id] = useState('');
    const [password, setpassword] = useState('');
    const [gender, setgender] = useState('');
    const [course, setcourse] = useState('');
    const [messenger_link, setmessenger_link] = useState('');
    const [skill, setskill] = useState('');
    const [yearlevel, setyear_level] = useState('');
    const [isChecked, setIsChecked] = useState(false); // Checkbox state
    const [message, setMessage] = useState(''); // Feedback message state
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        // Ensure checkbox is checked before submitting
        if (!isChecked) {
            alert('Please agree to the terms before submitting.');
            return;
        }

        axios.post('http://localhost:8081/studentform', {
            first_name,
            last_name,
            student_id,
            password,
            gender,
            course,
            messenger_link,
            skill,
            yearlevel
        })
        .then((res) => {
            console.log(res);
            alert('Form submitted successfully!');
            navigate('/login'); // Redirect on success
        })
        .catch((err) => {
            console.error("Error submitting form:", err);
            setMessage('Error connecting to backend API.');
        });
    };

    return (
        <div className='studentform-box'>
            <div className='studentform-blue-box'>
                <h2 className='studentform-welcomeH2'>Welcome Student</h2>
                <h4 className='studentform-helloH4'>
                    Hello, and welcome to Student Engagement 
                    and Activity Management System for LCC-B<br/> 
                    <span className='studentform-yellowtxt'>School of Business and Information<br/> 
                    Technology</span>
                </h4>
                <h4 className='studentform-paragraph3H4'>
                    Rest assured, the information you provide will<br/> 
                    be securely protected. It’s essential for the<br/> 
                    department’s records and critical to our ability to<br/> 
                    support your academic journey. Your privacy is<br/> 
                    our priority, and your data will only be used<br/> 
                    for authorized purposes within the institution.
                </h4>
                <label className="studentform-checkb-cont">
                    <input 
                        type="checkbox" 
                        checked={isChecked} 
                        onChange={() => setIsChecked(!isChecked)} 
                    />
                    <h4 className='studentform-checkboxtxt'>I understand and agree</h4>
                </label>
            </div>

            <div className='studentform-white-box'>
                <div className='studentform-txtandlogo-box'>
                    <h2 className='studentform-stdnth2'>Student Form</h2>
                </div>
                <form className="studentform-simple-form" onSubmit={handleSubmit}>
                    <div className="studentform-form-row">
                        <label htmlFor="first_name">First Name</label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={first_name}
                            onChange={e => setfirst_name(e.target.value)}
                            required
                        />
                    </div>

                    <div className="studentform-form-row">
                        <label htmlFor="last_name">Last Name</label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={last_name}
                            onChange={e => setlast_name(e.target.value)}
                            required
                        />
                    </div>

                    <div className="studentform-form-row">
                        <label htmlFor="student_id">Student ID</label>
                        <input
                            type="text"
                            id="student_id"
                            name="student_id"
                            value={student_id}
                            placeholder="12-1234-123"
                            pattern="^\d{2}-\d{4}-\d{3}$" // Regex for the required format
                            onChange={e => setstudent_id(e.target.value)}
                            required
                            title="Student ID must follow the format 12-1234-123"
                        />
                    </div>

                    <div className="studentform-form-row">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={e => setpassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="studentform-form-row">
                        <label htmlFor="yearlevel">Year Level</label>
                        <select
                            id="yearlevel"
                            name="yearlevel"
                            value={yearlevel}
                            onChange={e => setyear_level(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select Year Level</option>
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year</option>
                            <option value="5th Year">5th Year</option>
                        </select>
                    </div>

                    <div className="studentform-form-row">
                        <label htmlFor="course">Course</label>
                        <select
                            id="course"
                            name="course"
                            value={course}
                            onChange={e => setcourse(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select Course</option>
                            <option value="BSIT">Bachelor of Science in Information Technology</option>
                            <option value="BLIS">Bachelor of Library and Information Science</option>
                            <option value="BSBA">Bachelor of Science in Business Management</option>
                        </select>
                    </div>

                    <div className="studentform-form-row">
                        <label htmlFor="messenger_link">Messenger Link</label>
                        <input
                            type="text"
                            id="messenger_link"
                            name="messenger_link"
                            value={messenger_link}
                            onChange={e => setmessenger_link(e.target.value)}
                            required 
                        />
                    </div>

                    <div className="studentform-form-row">
                        <label htmlFor="gender">Gender</label>
                        <div className="studentform-gender-options">
                            <input
                                type="radio"
                                id="male"
                                name="gender"
                                value="male"
                                checked={gender === 'male'}
                                onChange={e => setgender(e.target.value)}
                                required
                            />
                            <label htmlFor="male">Male</label>
                            <input
                                type="radio"
                                id="female"
                                name="gender"
                                value="female"
                                checked={gender === 'female'}
                                onChange={e => setgender(e.target.value)}
                                required
                            />
                            <label htmlFor="female">Female</label>
                        </div>
                    </div>

                    <div className="studentform-form-row">
                        <label htmlFor="skill">Skill/Talent/Sport</label>
                        <input
                            type="text"
                            id="skill"
                            name="skill"
                            value={skill}
                            placeholder='ex. Volleybal/Acting/'
                            onChange={e => setskill(e.target.value)}
                            required
                        />
                    </div>

                    <button className='studentform-submitbtn' type="submit">Submit</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default Studentform;