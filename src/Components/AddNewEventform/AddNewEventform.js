import React, { useState } from 'react';
import Select from 'react-select';
import './AddNewEventform.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Notification from '../Notification/Notification';

const AddNewEventform = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    venue: '',
    eventDate: '',
    eventTime: '',
    eventTimeEnd: '',
    yearlevel: [],
    course: [],
    sanction: ''
  });

  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const gotoEventList = () => {
    navigate('/eventlist');
  };

  const yearLevelOptions = [
    { value: '1', label: '1st Year' },
    { value: '2', label: '2nd Year' },
    { value: '3', label: '3rd Year' },
    { value: '4', label: '4th Year' },
    { value: 'All Levels', label: 'All Levels' }
  ];

  const courseOptions = [
    { value: 'BSIT', label: 'Bachelor of Science in Information Technology' },
    { value: 'BLIS', label: 'Bachelor of Library and Information Science' },
    { value: 'BSBA', label: 'Bachelor of Science in Business Administration' },
    { value: 'All Courses', label: 'All Courses' }
  ];

  const validate = () => {
    let tempErrors = {};
    if (!formData.eventName) tempErrors.eventName = "Event name is required";
    if (!formData.venue) tempErrors.venue = "Venue is required";
    if (!formData.eventDate) tempErrors.eventDate = "Date is required";
    if (!formData.eventTime) tempErrors.eventTime = "Start time is required";
    if (!formData.eventTimeEnd) tempErrors.eventTimeEnd = "End time is required";
    if (formData.eventTimeEnd && formData.eventTimeEnd <= formData.eventTime) {
      tempErrors.eventTimeEnd = "End time must be after start time";
    }
    if (formData.yearlevel.length === 0) tempErrors.yearlevel = "Please select at least one year level";
    if (formData.course.length === 0) tempErrors.course = "Please select at least one course";
    if (!formData.sanction) tempErrors.sanction = "Sanction value is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: '' });
  };

  const handleMultiSelectChange = (selectedOptions, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: selectedOptions.map(option => option.value),
    });
    setErrors({ ...errors, [fieldName]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const isConfirmed = window.confirm("Confirm Event Submission?");
    if (!isConfirmed) return;

    setIsLoading(true);
    try {
        const response = await axios.post('http://localhost:8081/addeventform', {
            ...formData,
            yearlevel: formData.yearlevel, // Sending array directly
            course: formData.course,       // Sending array directly
        });
        
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);

        setFormData({
            eventName: '',
            venue: '',
            eventDate: '',
            eventTime: '',
            eventTimeEnd: '',
            yearlevel: [],
            course: [],
            sanction: ''
        });
        console.log(response.data);
    } catch (error) {
        console.error("Error submitting form:", error);
        setMessage(error.response?.data?.message || "An error occurred. Please try again.");
    }
    setIsLoading(false);
};
  return (
    <div className='ANEform-mainbox'>

    <Notification
      message="Event Successfully Submitted"
      isVisible={showNotification}
    />

      {/* Sidebar Section */}
      <div className="ANEform-sidebar">
        <div className="ANEform-logo">
          <div className='ANEform-seamslogo'></div>
          <h2 className='ANEform-seams-txt'>SEAMS</h2>
        </div>

        <div className='ANEform-adminbox'>
          <div className='ANEform-adminimage'></div>
          <h2 className='ANEform-adminNameH2'>Jerryl Perez</h2>
        </div>

        <div className="ANEform-menu">
          <button>COURSE</button>
          <button>EVENT</button>
          <button>SANCTION</button>
          <button>DATABASE</button>
        </div>

        <div className="ANEform-exit">
          <div className='ANEform-exitimg'></div>
          <button>EXIT</button>
        </div>
      </div>

      {/* Content Section */}
      <div className='ANEform-leftcont-box'>
        <div className='ANEform-logoboxlcc'>
          <div className='ANEform-lccBlogo'></div>
        </div>

        <div className="ANEform-backevent-btnbox">
          <div className='ANEform-order1'>
            <div className='ANEform-arrowimg'></div>
            <button className='ANEform-backevent-btn'>Back to events</button>
          </div>
          <h4 className='ANEform-backbtnh4' onClick={gotoEventList}>Press to return to the events page</h4>
        </div>

        {/* Add Event Form */}
        <div className='ANEform-addeventForm'>
          <h2 className='ANEform-addeventformH2'>Event Information</h2>
          <h4 className='ANEform-addeventformH4'>Please enter details to proceed</h4>

          <form onSubmit={handleSubmit}>
            <div className="ANEform-form-grid">
              {/* Form Fields */}
              {[
                { label: 'Event Name', name: 'eventName', type: 'text', placeholder: 'Enter event name' },
                { label: 'Venue', name: 'venue', type: 'text', placeholder: 'Enter venue' },
                { label: 'Date', name: 'eventDate', type: 'date', placeholder: '' },
                { label: 'Time Start', name: 'eventTime', type: 'time', placeholder: '' },
                { label: 'Time End', name: 'eventTimeEnd', type: 'time', placeholder: '' },
                { label: 'Sanction Value', name: 'sanction', type: 'number', placeholder: 'Enter sanction value' },
              ].map(field => (
                <div key={field.name} className="ANEform-form-group">
                  <label className='ANEform-addeventformlabel' htmlFor={field.name}>{field.label}</label>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    required
                  />
                  {errors[field.name] && <small className="error">{errors[field.name]}</small>}
                </div>
              ))}

              {/* Multi-Select Fields */}
              <div className="ANEform-form-group">
                <label className="ANEform-addeventformlabel" htmlFor="yearlevel">Year Level</label>
                <Select
                  isMulti
                  options={yearLevelOptions}
                  onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, "yearlevel")}
                  value={yearLevelOptions.filter(option => formData.yearlevel.includes(option.value))}
                  className="ANEform-custom-multi-select"
                />
                {errors.yearlevel && <small className="error">{errors.yearlevel}</small>}
              </div>

              <div className="ANEform-form-group">
                <label className="ANEform-addeventformlabel" htmlFor="course">Course</label>
                <Select
                  isMulti
                  options={courseOptions}
                  onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, "course")}
                  value={courseOptions.filter(option => formData.course.includes(option.value))}
                  className="ANEform-custom-multi-select"
                />
                {errors.course && <small className="error">{errors.course}</small>}
              </div>

              {/* Submit Button */}
              <div className="ANEform-form-group">
                <button type="submit" className='ANEform-submit-btnANE' disabled={isLoading}>
                  {isLoading ? 'Submitting...' : 'Submit Event'}
                </button>
              </div>
            </div>
          </form>

          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default AddNewEventform;