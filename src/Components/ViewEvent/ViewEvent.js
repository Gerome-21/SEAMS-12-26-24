import React, { useState } from 'react';
import Select from 'react-select'; // Import react-select
import './ViewEvent.css';
import { useNavigate } from 'react-router-dom';

const ViewEvent = ({ event, onClose }) => {
  const [updatedEvent, setUpdatedEvent] = useState(event);
  const navigate = useNavigate();
  const goToStudentEventList = () => {
    navigate('/studenteventlist', { state: { event: updatedEvent } });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  // Function to format date to Day/Month/Year
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const yearLevelOptions = [
    { value: '1', label: '1st Year' },
    { value: '2', label: '2nd Year' },
    { value: '3', label: '3rd Year' },
    { value: '4', label: '4th Year' },
    { value: 'all', label: 'All Years' },
  ];

  const courseOptions = [
    { value: 'BSIT', label: 'Bachelor of Science in Information Technology' },
    { value: 'BLIS', label: 'Bachelor of Library and Information Science' },
    { value: 'BSBA', label: 'Bachelor of Science in Business Administration' },
  ];

  // Prepare the display values for multi-select dropdowns
  const selectedYearLevels = yearLevelOptions.filter(option =>
    updatedEvent.yearlevel.includes(option.value)
  );
  const selectedCourses = courseOptions.filter(option =>
    updatedEvent.course.includes(option.value)
  );

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>View Event</h2>
          <button className="x-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="form-row">
            <div className="form-group">
              <label>Event Name:</label>
              <input
                type="text"
                name="eventName"
                value={updatedEvent.eventName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Venue:</label>
              <input
                type="text"
                name="venue"
                value={updatedEvent.venue}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Event Time:</label>
              <input
                type="text"
                name="eventTime"
                value={updatedEvent.eventTime}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Event Time End:</label>
              <input
                type="text"
                name="eventTimeEnd"
                value={updatedEvent.eventTimeEnd}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Event Date:</label>
              <input
                type="text"
                name="eventDate"
                value={formatDate(updatedEvent.eventDate)}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Sanction:</label>
              <input
                type="text"
                name="sanction"
                value={updatedEvent.sanction}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Year Level:</label>
            <Select
              isMulti
              options={yearLevelOptions}
              value={selectedYearLevels}
              isDisabled
            />
          </div>

          <div className="form-group">
            <label>Course:</label>
            <Select
              isMulti
              options={courseOptions}
              value={selectedCourses}
              isDisabled
            />
          </div>
          <button onClick={goToStudentEventList}>Attendees</button>
        </div>          
      </div>
    </div>
  );
};

export default ViewEvent;