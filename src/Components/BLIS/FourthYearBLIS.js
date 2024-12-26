import React, { useEffect, useState } from 'react';
import './FirstyrBLIS.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const FourthYearBLIS = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const gotoCourseList = () => {
        navigate('/courselist');
      };
  
      useEffect(() => {
        const fetchStudents = async () => {
          try {
            const response = await axios.get('http://localhost:8081/');
            console.log(response.data); // Log the response data to check
            const firstYearBSITStudents = response.data.filter(student => {
              // Log each student to check the values
              console.log(student.yearlevel, student.course); 
              return student.yearlevel === "4th Year" && student.course === "BLIS";
            });
            console.log(firstYearBSITStudents); // Log the filtered students
            setStudents(firstYearBSITStudents);
            setLoading(false);
          } catch (err) {
            console.error("Error fetching student lists:", err);
            setError("Failed to fetch student lists.");
            setLoading(false);
          }
        };
    
        fetchStudents();
      }, []); // Empty dependency array ensures this effect runs once when the component mounts
    
      const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
          try {
            await axios.delete('http://localhost:8081/students/${id}');
            setStudents(prevStudents => prevStudents.filter(student => student.id !== id));
            alert('Student deleted successfully.');
          } catch (error) {
            console.error(error);
            alert('Failed to delete the student. Please try again.');
          }
        }
      };
  
    return (
      <div className="firstyearlist-mainbox">
        {/* Sidebar Section */}
        <div className="firstyearlist-sidebar">
          <div className="firstyearlist-logo">
            <div className="firstyearlist-seamslogo"></div>
            <h2 className="firstyearlist-seams-txt">SEAMS</h2>
          </div>
  
          <div className='firstyearlist-adminbox'>
            <div className='firstyearlist-adminimage'></div>
            <h2 className='firstyearlist-adminNameH2'>Jerryl Perez</h2>
          </div>
  
          <div className="firstyearlist-menu">
            <button onClick={gotoCourseList}>COURSE</button>
            <button>EVENT</button>
            <button>SANCTION</button>
            <button>DATABASE</button>
          </div>
          <div className="firstyearlist-exit">
            <div className="firstyearlist-exitimg"></div>
            <button>EXIT</button>
          </div>
        </div>
  
        {/* Content Section */}
        <div className="firstyearlist-leftcont-box">
          <div className="firstyearlist-logoboxlcc">
            <div className="firstyearlist-lccBlogo"></div>
          </div>
          <div className="firstyearlist-backevent-btnbox">
            <div className="firstyearlist-order1">
              <div className="firstyearlist-arrowimg"></div>
              <button className="firstyearlist-backevent-btn">Back to Year Levels</button>
            </div>
            <h4 className="firstyearlist-backbtnh4">Press to return to the year levels page</h4>
          </div>
  
          <div className="firstyearlist-addeventForm">
            <h2 className="firstyearlist-addeventformH2">Bachelor of Library and Information Science</h2>
            <div className="firstyearlist-eventDetails-box">
              <h4 className="firstyearlist-addeventformH4">(BLIS) Fourth Year</h4>
            </div>
  
            {/* Attendee Table */}
            {loading ? (
              <p>Loading first year student list...</p>
            ) : error ? (
              <p>{error}</p>
            ) : students.length === 0 ? (
              <p>No students available.</p>
            ) : (
              <table className="firstyearlist-attendee-table">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Student I.d</th>
                    <th>Password</th>
                    <th>Gender</th>
                    <th>Messenger</th>
                    <th>Skill</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((data, index) => (
                    <tr key={index}>
                      <td>{data.first_name}</td>
                      <td>{data.last_name}</td>
                      <td>{data.student_id}</td>
                      <td>{data.password}</td>
                      <td>{data.gender}</td>
                      <td>{data.messenger_link}</td>
                      <td>{data.skill}</td>
                      <td>
                        <Link to={`updatefrstyear/${data.id}`} className='firstyearlist-updatebtn'>Update</Link>
                        <button className='firstyearlist-deletebtn'onClick={ e => handleDelete(data.id)}>Delete</button>
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

export default FourthYearBLIS