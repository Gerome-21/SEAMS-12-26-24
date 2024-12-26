import React from 'react';
import './YearLevel.css';
import { useNavigate } from 'react-router-dom';

const YearLevel = () => {
  const navigate = useNavigate();

  const gotoFirstyearList = () => {
    navigate('/firstyearlist');
  };
  const gotoSecondyearList = () => {
    navigate('/bsitsecondyearlist');
  };
  const gotoThirdyearList = () => {
    navigate('/bsitthirdyearlist');
  };
  const gotoFourthyearList = () => {
    navigate('/bsitfourthyearlist');
  };
  const gotoCourseList = () => {
    navigate('/courselist');
  };


    return (
        <div className="yearlevel-mainbox">
          {/* Sidebar Section */}
          <div className="yearlevel-sidebar">
            <div className="yearlevel-logo">
              <div className="yearlevel-seamslogo"></div>
              <h2 className="yearlevel-seams-txt">SEAMS</h2>
            </div>

            <div className='yearlevel-adminbox'>
              <div className='yearlevel-adminimage'></div>
              <h2 className='yearlevel-adminNameH2'>Jerryl Perez</h2>
            </div>

            <div className="yearlevel-menu">
              <button onClick={gotoCourseList}>COURSE</button>
              <button>EVENT</button>
              <button>SANCTION</button>
              <button>DATABASE</button>
            </div>
            <div className="yearlevel-exit">
              <div className="yearlevel-exitimg"></div>
              <button>EXIT</button>
            </div>
          </div>
    
          {/* Content Section */}
          <div className="yearlevel-leftcont-box">
            <div className="yearlevel-logoboxlcc">
              <div className="yearlevel-lccBlogo"></div>
            </div>
            <div className="yearlevel-backevent-btnbox">
          <div className='yearlevel-order1'>
            <div className='yearlevel-arrowimg'></div>
            <button className='yearlevel-backevent-btn' onClick={gotoCourseList}>Back to course page</button>
          </div>
          <h4 className='yearlevel-backbtnh4'>
            Press to return to the course landing page          
            </h4>
        </div>
    
            <div className="yearlevel-addeventForm">
              <h2 className="yearlevel-allcoursesmH2">Bachelor of Science in Information Technology</h2>
            </div>
            {/* 1st */}
            <button className="yearlevel-course-box" onClick={gotoFirstyearList}>
              <h2 className="yearlevel-addeventformH2">First Year (1st)</h2>
              <h4 className="yearlevel-addeventformH4">Press to see all the students listed by the system in the 1st Year of the BSIT course.</h4>
            </button>
            {/* 2nd */}
            <button className="yearlevel-course-box" onClick={gotoSecondyearList}>
              <h2 className="yearlevel-addeventformH2">Second Year (2nd)</h2>
              <h4 className="yearlevel-addeventformH4">Press to see all the students listed by the system in the 2nd Year of the BSIT course.</h4>
            </button>
            {/*3rd */}
            <button className="yearlevel-course-box" onClick={gotoThirdyearList}>
              <h2 className="yearlevel-addeventformH2">Third Year (3rd)</h2>
              <h4 className="yearlevel-addeventformH4">Press to see all the students listed by the system in the 3rd Year of the BSIT course.</h4>
            </button>
            {/*4th */}
            <button className="yearlevel-course-box" onClick={gotoFourthyearList}>
              <h2 className="yearlevel-addeventformH2">Fourt Year (4th)</h2>
              <h4 className="yearlevel-addeventformH4">Press to see all the students listed by the system in the 4th Year of the BSIT course.</h4>
            </button>
          </div>
        </div>
      );
}

export default YearLevel