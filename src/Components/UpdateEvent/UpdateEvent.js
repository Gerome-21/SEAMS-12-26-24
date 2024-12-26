import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // Import react-select
import './UpdateEvent.css';

const UpdateEvent = ({ event, onClose, onUpdate }) => {
  const [updatedEvent, setUpdatedEvent] = useState({
    ...event,
    yearlevel: event.yearlevel || [], // Ensure it's an array
    course: event.course || [],       // Ensure it's an array
    eventName: event.eventName || '', 
    venue: event.venue || '',
    eventDate: event.eventDate || '',
    eventTime: event.eventTime || '',
    eventTimeEnd: event.eventTimeEnd || '',
    sanction: event.sanction || '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // State for success message

  // Year Level and Course options for the Select component
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

  useEffect(() => {
    setUpdatedEvent((prevEvent) => ({
      ...prevEvent,
      yearlevel: event.yearlevel || [],
      course: event.course || [],
    }));
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleMultiSelectChange = (selectedOptions, fieldName) => {
    setUpdatedEvent((prevEvent) => ({
      ...prevEvent,
      [fieldName]: selectedOptions ? selectedOptions.map(option => option.value) : [],
    }));
  };

  const updateEvent = async (updatedEvent) => {
    try {
      const formData = {
        eventName: updatedEvent.eventName,
        venue: updatedEvent.venue,
        eventDate: updatedEvent.eventDate,
        eventTime: updatedEvent.eventTime,
        eventTimeEnd: updatedEvent.eventTimeEnd,
        yearlevel: updatedEvent.yearlevel.join(','),
        course: updatedEvent.course.join(','),
        sanction: updatedEvent.sanction,
      };

      const response = await fetch(`http://localhost:8081/events/update/${updatedEvent.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error('Failed to update event');
      }

      const data = await response.json();
      console.log('Event updated successfully:', data);
      return data;
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !updatedEvent.eventName ||
      !updatedEvent.venue ||
      !updatedEvent.eventDate ||
      !updatedEvent.eventTime ||
      !updatedEvent.eventTimeEnd ||
      !updatedEvent.yearlevel.length ||
      !updatedEvent.course.length
    ) {
      setError('All fields are required.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await updateEvent(updatedEvent);
      if (data) {
        setSuccessMessage('Event updated successfully!'); // Show success message
        setTimeout(() => setSuccessMessage(null), 3000); // Hide success message after 3 seconds
        onUpdate(updatedEvent); // Update parent component
        onClose(); // Close modal
      }
    } catch (error) {
      console.error('Error updating event:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Update Event</h2>
          <button className="x-button" onClick={onClose}>&times;</button>
        </div>
        
        {/* Display success message */}
        {successMessage && <div className="success-message">{successMessage}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Event Name:</label>
              <input
                type="text"
                name="eventName"
                value={updatedEvent.eventName}
                onChange={handleChange}
                placeholder="Enter event name"
              />
            </div>
            <div className="form-group">
              <label>Venue:</label>
              <input
                type="text"
                name="venue"
                value={updatedEvent.venue}
                onChange={handleChange}
                placeholder="Enter venue"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Event Time:</label>
              <input
                type="time"
                name="eventTime"
                value={updatedEvent.eventTime}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Event Time End:</label>
              <input
                type="time"
                name="eventTimeEnd"
                value={updatedEvent.eventTimeEnd}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Event Date:</label>
              <input
                type="date"
                name="eventDate"
                value={updatedEvent.eventDate}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Sanction:</label>
              <input
                type="text"
                name="sanction"
                value={updatedEvent.sanction}
                onChange={handleChange}
                placeholder="Enter sanction"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Year Level:</label>
            <Select
              isMulti
              options={yearLevelOptions}
              onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, 'yearlevel')}
              value={yearLevelOptions.filter(option => updatedEvent.yearlevel.includes(option.value))}
            />
          </div>

          <div className="form-group">
            <label>Course:</label>
            <Select
              isMulti
              options={courseOptions}
              onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, 'course')}
              value={courseOptions.filter(option => updatedEvent.course.includes(option.value))}
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="button-group">
            <button type="submit" className="update-button" disabled={loading}>
              {loading ? 'Updating...' : 'Update Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEvent;