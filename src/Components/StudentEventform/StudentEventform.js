import React, { useEffect, useState } from 'react';
import './StudentEventform.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentEventform = () => {
    const navigate = useNavigate();
    const [studentName, setStudentName] = useState('');
    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({
        studentId: "",
        eventId: "",
        proof: null,
        reason: "",
    });
    const [message, setMessage] = useState(null); // Updated to allow null values
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        axios
            .get('http://localhost:8081/events')
            .then((res) => {
                setEvents(res.data);
            })
            .catch((err) => console.error("Error fetching events:", err));

        const student = JSON.parse(localStorage.getItem('student'));
        if (student) {
            setStudentName(`${student.first_name} ${student.last_name}`);
            fetchEventsForStudent(student);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const fetchEventsForStudent = async (student) => {
        try {
            const response = await axios.get('http://localhost:8081/events/student-specific', {
                params: {
                    course: student.course,
                    yearlevel: student.yearlevel
                }
            });
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
            setEvents([]);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('student');
        navigate('/login');
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "proof") {
            setFormData({ ...formData, [name]: files[0] });
        } else if (name === "event") {
            const event = events.find((event) => event.eventName === value);
            setSelectedEvent(event);
            setFormData({ ...formData, [name]: value, eventId: event.id });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isConfirmed = window.confirm("Confirm Submit?");
        if (!isConfirmed) return;

        const data = new FormData();
        data.append("studentId", formData.studentId);
        data.append("eventId", formData.eventId);
        data.append("proof", formData.proof);
        data.append("reason", formData.reason);

        try {
            const response = await axios.post('http://localhost:8081/events/submit', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage({ text: "Form submitted successfully!", success: true });
        } catch (error) {
            console.error("Error submitting form:", error);
            setMessage({ text: "An error occurred. Please try again.", success: false });
        }
    };

    return (
        <div className='stndteventfrm-box'>
            <div className='stndteventfrm-blue-box'>
                <h2 className='stndteventfrm-welcomeH2'>Welcome Student</h2>
                <h4 className='stndteventfrm-studentLogin-name'>{studentName}</h4>
                <h4 className='stndteventfrm-helloH4'>
                    School of Business and Information Technology
                </h4>
                <div className='stndteventfrm-optionselect-btn'>
                    <button className='stndteventfrm-event-btn' type="button" aria-label="Event Button">Event</button>
                    <button className='stndteventfrm-sanction-btn' type="button" aria-label="Sanction Button">Sanction</button>
                </div>
                <button
                    className='stndteventfrm-exit-btn'
                    type="button"
                    aria-label="Exit Button"
                    onClick={handleLogout}
                >
                    Exit
                </button>
            </div>

            <div className='stndteventfrm-white-box'>
                <div className='stndteventfrm-txtandlogo-box'>
                    <h2 className='stndteventfrm-stdnth2'>Event Form</h2>
                    <div className='stndteventfrm-lccblogoP2'></div>
                </div>
                <form className="stndteventfrm-simple-form" onSubmit={handleSubmit}>
                    <div className="stndteventfrm-form-row">
                        <label htmlFor="event">Event</label>
                        <select
                            id="event"
                            name="event"
                            value={formData.event}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>
                                Select Event
                            </option>
                            {events.map((event) => (
                                <option key={event.id} value={event.eventName}>
                                    {event.eventName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="stndteventfrm-form-row">
                        <label htmlFor="venue">Venue</label>
                        <input
                            type="text"
                            id="venue"
                            name="venue"
                            value={selectedEvent?.venue || ""}
                            readOnly
                            className="stndteventfrm-venue-input"
                        />
                    </div>

                    <div className="stndteventfrm-form-row">
                        <label htmlFor="proof">Proof</label>
                        <input
                            type="file"
                            id="proof"
                            name="proof"
                            accept="image/*"
                            onChange={handleChange}
                            required
                            className="stndteventfrm-proof-input"
                        />
                        <h4 className='stndteventfrm-noteh4'>
                            *Take a clear photo with your school<br />
                            ID visible during the event.
                        </h4>
                    </div>

                    <div className="stndteventfrm-form-row">
                        <label htmlFor="reason">Reason</label>
                        <input
                            type="text"
                            id="reason"
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            required
                        />
                        <h4 className='stndteventfrm-noteh4'>
                            **If cannot attend, please state the reason<br />
                            and attach proof, otherwise write 'n/a'.
                        </h4>
                    </div>

                    <button className='stndteventfrm-submit-btn' type="submit">Submit</button>
                </form>
                {message && (
                    <p style={{ color: message.success ? 'green' : 'red' }}>
                        {message.text}
                    </p>
                )}
            </div>
        </div>
    );
};

export default StudentEventform;
