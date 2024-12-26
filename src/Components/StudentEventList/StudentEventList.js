import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './StudentEventList.css';
import axios from 'axios';

const StudentEventList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event; // Retrieve the passed event details
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (event?.id) {
      axios
        .get(`http://localhost:8081/events/${event.id}/attendees`)
        .then((res) => {
          setStudents(res.data);
        })
        .catch((err) => {
          console.error('Error fetching attendees:', err);
          setError('Failed to fetch attendees.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [event]);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Approved':
        return 'status-approved';
      case 'Not Approved':
        return 'status-notapproved';
      default:
        return 'status-default';
    }
  };

  return (
    <div className="stdntElist-mainbox">
      {/* Sidebar Section */}
      <div className="stdntElist-sidebar">
        <div className="stdntElist-logo">
          <div className="stdntElist-seamslogo"></div>
          <h2 className="stdntElist-seams-txt">SEAMS</h2>
        </div>

        <div className="stdntElist-adminbox">
          <div className="stdntElist-adminimage"></div>
          <h2 className="stdntElist-adminNameH2">Jerryl Perez</h2>
        </div>

        <div className="stdntElist-menu">
          <button>COURSE</button>
          <button>EVENT</button>
          <button>SANCTION</button>
          <button>DATABASE</button>
        </div>
        <div className="stdntElist-exit">
          <button>EXIT</button>
        </div>
      </div>

      {/* Content Section */}
      <div className="stdntElist-leftcont-box">
      <div className="stdntElist-lccBlogo"></div>
      <div className="stdntElist-backevent-btnbox">
           <div className="stdntElist-order1">
             <div className="stdntElist-arrowimg"></div>
             <button className="stdntElist-backevent-btn"  onClick={() => navigate('/eventlist')} >Back to events</button>
           </div>
           <h4 className="stdntElist-backbtnh4">Press to return to the events page</h4>
         </div>

        <div className="stdntElist-addeventForm">
          <h2 className="stdntElist-addeventformH2">{event?.eventName}</h2>
          <div className="stdntElist-eventDetails-box">
            <h4 className="stdntElist-addeventformH4">Venue: {event?.venue}</h4>
            <h4 className="stdntElist-addeventformH4">Date: {event?.eventDate}</h4>
            <h4 className="stdntElist-addeventformH4">Time: {event?.eventTime} - {event?.eventTimeEnd}</h4>
            <h4 className="stdntElist-addeventformH4">Year Level: {event?.yearlevel}</h4>
            <h4 className="stdntElist-addeventformH4">Course: {event?.course}</h4>
            <h4 className="stdntElist-addeventformH4">Attendees: {event?.attendees}</h4>
          </div>

          {/* Attendee Table */}
          {loading ? (
            <p>Loading attendees...</p>
          ) : error ? (
            <p>{error}</p>
          ) : students.length === 0 ? (
            <p>No attendees found.</p>
          ) : (
            <table className="stdntElist-attendee-table">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Gender</th>
                  <th>Course</th>
                  <th>Proof</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.firstname}</td>
                    <td>{student.lastname}</td>
                    <td>{student.gender}</td>
                    <td>{student.course}</td>
                    <td>
                      {student.proof ? (
                        <a
                          href={student.proof}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={student.proof}
                            alt="Proof"
                            onError={(e) => (e.target.src = '/path/to/default-image.png')}
                            style={{
                              width: '50px',
                              height: '50px',
                              objectFit: 'cover',
                              cursor: 'pointer',
                            }}
                          />
                        </a>
                      ) : (
                        'No proof uploaded'
                      )}
                    </td>
                    <td>{student.reason}</td>
                    <td className={getStatusClass(student.status)}>
                      {student.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentEventList;


///////////////////////////////Display nga wala sa database naka connect(Layout)//////////
// import React, { useEffect, useState } from 'react';
// import './StudentEventList.css';
// import axios from 'axios';

// const StudentEventList = () => {

//   useEffect(() => {
//     axios
//       .get('')//Diri butang ang link sang localhost(API link kung kung diin kwaon ang data(XAMPP/SQL))
//       .then((res) => console.log(res))
//       .catch((err) => console.log(err));
//   }, []);
  
//   const events = [
//     { firstname: 'John', lastname: 'Doe', gender: 'Male', course: 'BSIT', proof: '/imageattached.png', reason: 'Networking Night', status: 'Approved' },
//     { firstname: 'Jane', lastname: 'Smith', gender: 'Female', course: 'BLIS', proof: '/imageattached.png', reason: 'Design Sprint', status: 'Pending' },
//     { firstname: 'Albert', lastname: 'Johnson', gender: 'Male', course: 'BSCS', proof: '/imageattached.png', reason: 'Workshop on React', status: 'Approved' },
//     { firstname: 'Emily', lastname: 'Davis', gender: 'Female', course: 'BSA', proof: '/imageattached.png', reason: 'Annual Conference', status: 'Not Approved' },
//     { firstname: 'Michael', lastname: 'Brown', gender: 'Male', course: 'BSIS', proof: '/imageattached.png', reason: 'Tech Talk', status: 'Approved' },
//     { firstname: 'Sarah', lastname: 'Wilson', gender: 'Female', course: 'BSED', proof: '', reason: 'Career Fair', status: 'Pending' },
//     { firstname: 'David', lastname: 'Martinez', gender: 'Male', course: 'BSCrim', proof: '', reason: 'Internship Workshop', status: 'Not Approved' },
//     { firstname: 'Sophia', lastname: 'Anderson', gender: 'Female', course: 'BLIS', proof: '', reason: 'Guest Lecture', status: 'Approved' },
//     { firstname: 'James', lastname: 'Taylor', gender: 'Male', course: 'BSCE', proof: '', reason: 'Project Showcase', status: 'Pending' },
//     { firstname: 'Olivia', lastname: 'Thomas', gender: 'Female', course: 'BSIT', proof: '', reason: 'Innovation Day', status: 'Approved' },
//     { firstname: 'Lucas', lastname: 'Jackson', gender: 'Male', course: 'BSA', proof: '', reason: 'Workshop on Leadership', status: 'Approved' },
//     { firstname: 'Mia', lastname: 'White', gender: 'Female', course: 'BSCrim', proof: '', reason: 'Coding Bootcamp', status: 'Pending' },
//     { firstname: 'Ethan', lastname: 'Harris', gender: 'Male', course: 'BSCS', proof: '', reason: 'Networking Session', status: 'Not Approved' },
//     { firstname: 'Isabella', lastname: 'Clark', gender: 'Female', course: 'BSIS', proof: '', reason: 'Annual Review', status: 'Approved' },
//   ];

//   const getStatusClass = (status) => {
//     switch (status) {
//       case 'Approved':
//         return 'status-approved';
//       case 'Not Approved':
//         return 'status-notapproved';
//       default:
//         return 'status-default';
//     }
//   };

//   return (
//     <div className="stdntElist-mainbox">
//       {/* Sidebar Section */}
//       <div className="stdntElist-sidebar">
//         <div className="stdntElist-logo">
//           <div className="stdntElist-seamslogo"></div>
//           <h2 className="stdntElist-seams-txt">SEAMS</h2>
//         </div>

//         <div className='stdntElist-adminbox'>
//           <div className='stdntElist-adminimage'></div>
//           <h2 className='stdntElist-adminNameH2'>Jerryl Perez</h2>
//         </div>

//         <div className="stdntElist-menu">
//           <button>COURSE</button>
//           <button>EVENT</button>
//           <button>SANCTION</button>
//           <button>DATABASE</button>
//         </div>
//         <div className="stdntElist-exit">
//           <div className="stdntElist-exitimg"></div>
//           <button>EXIT</button>
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="stdntElist-leftcont-box">
//         <div className="stdntElist-logoboxlcc">
//           {/* <h2 className='stdntElist-headertxtH2'>LA CONSOLACION COLLEGE-BACOLOD</h2> */}
//           <div className="stdntElist-lccBlogo"></div>
//         </div>
//         <div className="stdntElist-backevent-btnbox">
//           <div className="stdntElist-order1">
//             <div className="stdntElist-arrowimg"></div>
//             <button className="stdntElist-backevent-btn">Back to events</button>
//           </div>
//           <h4 className="stdntElist-backbtnh4">Press to return to the events page</h4>
//         </div>

//         <div className="stdntElist-addeventForm">
//           <h2 className="stdntElist-addeventformH2">Departmental Meeting</h2>
//           <div className="stdntElist-eventDetails-box">
//             <h4 className="stdntElist-addeventformH4">Venue: Auditorium</h4>
//             <h4 className="stdntElist-addeventformH4">Date: 06/30/2024</h4>
//             <h4 className="stdntElist-addeventformH4">Course: All Courses</h4>
//             <h4 className="stdntElist-addeventformH4">Year Level: 1,2,3,4</h4>
//             <h4 className="stdntElist-addeventformH4">Total # Attendees: 490</h4>
//           </div>

//           {/* Attendee Table */}
//           <table className="stdntElist-attendee-table">
//             <thead>
//               <tr>
//                 <th>First Name</th>
//                 <th>Last Name</th>
//                 <th>Gender</th>
//                 <th>Course</th>
//                 <th>Proof</th>
//                 <th>Reason</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {events.map((event, index) => (
//                 <tr key={index}>
//                   <td>{event.firstname}</td>
//                   <td>{event.lastname}</td>
//                   <td>{event.gender}</td>
//                   <td>{event.course}</td>
//                   <td>
//                     {event.proof ? (
//                       <a href={event.proof} target="_blank" rel="noopener noreferrer">
//                         <img 
//                           src={event.proof} 
//                           alt="Proof" 
//                           style={{ width: '50px', height: '50px', objectFit: 'cover', cursor: 'pointer' }}
//                         />
//                       </a>
//                     ) : (
//                       "No proof uploaded"
//                     )}
//                   </td>
//                   <td>{event.reason}</td>
//                   <td className={getStatusClass(event.status)}>{event.status}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentEventList;
