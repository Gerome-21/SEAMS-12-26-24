import React from 'react';
import './CoursesList.css';
import { useNavigate } from 'react-router-dom';

const CoursesList = () => {
  const navigate = useNavigate();

  // Retrieve admin profile from localStorage
  const admin_name = localStorage.getItem('admin_name'); // Get the admin's name from localStorage

  const goToBSITYearLevel = () => {
    navigate('/yearlevel');
  };

  const goToBLISYearLevel = () => {
    navigate('/BLISyearlevel');
  };

  const goToHomepage = () => {
    navigate('/adminpage');
  };

  return (
    <div className="courselist-mainbox">
      {/* Sidebar Section */}
      <div className="courselist-sidebar">
        <div className="courselist-logo">
          <div className="courselist-seamslogo"></div>
          <h2 className="courselist-seams-txt">SEAMS</h2>
        </div>

        <div className="courselist-adminbox">
          <div className="courselist-adminimage"></div>
          <h2 className="courselist-adminNameH2">{admin_name || "Admin Jerryl"}</h2> {/* Display admin name dynamically */}
        </div>

        <div className="courselist-menu">
          <button>COURSE</button>
          <button>EVENT</button>
          <button>SANCTION</button>
          <button>DATABASE</button>
        </div>
        <div className="courselist-exit">
          <div className="courselist-exitimg"></div>
          <button>EXIT</button>
        </div>
      </div>

      {/* Content Section */}
      <div className="courselist-leftcont-box">
        <div className="courselist-logoboxlcc">
          <div className="courselist-lccBlogo"></div>
        </div>
        <div className="courselist-backevent-btnbox">
          <div className='courselist-order1'>
            <div className='courselist-arrowimg'></div>
            <button className='courselist-backevent-btn' onClick={goToHomepage}>Back to home page</button>
          </div>
          <h4 className='courselist-backbtnh4'>
            Press to return to the home landing page          
          </h4>
        </div>

        <div className="courselist-addeventForm">
          <h2 className="courselist-allcoursesmH2">All Courses</h2>
        </div>
        {/* BSIT */}
        <button className="courselist-course-box" onClick={goToBSITYearLevel}>
          <h2 className="courselist-addeventformH2">Bachelor of Science and Information Technology (BSIT)</h2>
          <h4 className="courselist-addeventformH4">Press to see all the students listed by the system in this course.</h4>
        </button>
        {/* BLIS */}
        <button className="courselist-course-box" onClick={goToBLISYearLevel}>
          <h2 className="courselist-addeventformH2">Bachelor of Library and Information Science (BLIS)</h2>
          <h4 className="courselist-addeventformH4">Press to see all the students listed by the system in this course.</h4>
        </button>
        {/* BSBA */}
        <button className="courselist-course-box" onClick={goToBLISYearLevel}>
          <h2 className="courselist-addeventformH2">Bachelor of Science in Business Administration (BSBA)</h2>
          <h4 className="courselist-addeventformH4">Press to see all the students listed by the system in this course.</h4>
        </button>
      </div>
    </div>
  );
}

export default CoursesList;
