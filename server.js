const express = require('express');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'seams',
});

app.listen(8081, () => {
    console.log("Listening on port 8081");
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
    console.log('Connected to the database');
});

//---------------------------------------------------------------------------------------------------------------------------------
// Login endpoint
    // Login endpoint
app.post('/students/login', (req, res) => {
    const { student_id, password } = req.body;

    if (!student_id || !password) {
        return res.status(400).json({ success: false, message: "Student ID and password are required." });
    }

    const sql = "SELECT first_name, last_name FROM students WHERE student_id = ? AND password = ?";
    db.query(sql, [student_id, password], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ success: false, message: "An error occurred." });
        }

        if (results.length > 0) {
            const { first_name, last_name } = results[0];
            return res.status(200).json({
                success: true,
                message: "Login successful.",
                student: { first_name, last_name }
            });
        } else {
            return res.status(401).json({ success: false, message: "Invalid Student ID or password." });
        }
    });
});


//------------------------------------------------LOGIN ADMIN------------------------------------------------------------------
// Login Admin endpoint
app.post('/admins/loginAdmin', (req, res) => {
    const { admin_id, password } = req.body;

    if (!admin_id || !password) {
        return res.status(400).json({ success: false, message: "Admin ID and password are required." });
    }

    const sql = "SELECT admin_id, admin_name FROM admins WHERE admin_id = ? AND password = ?";
    db.query(sql, [admin_id, password], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ success: false, message: "An internal error occurred." });
        }

        if (results.length > 0) {
            return res.status(200).json({
                success: true,
                message: "Login successful.",
                admin: { admin_id: results[0].admin_id, admin_name: results[0].admin_name }
            });
        } else {
            return res.status(401).json({ success: false, message: "Invalid Admin ID or password." });
        }
    });
});



// ---------------------------------ADMIN Profile------------------------------------------
// Endpoint to fetch Admin profile data
app.get('/admins/adminpage', (req, res) => {
    const admin_id = req.query.admin_id; // Assume admin ID is passed as a query parameter

    // Ensure that admin_id is provided
    if (!admin_id) {
        return res.status(400).json({ success: false, message: "Admin ID is required." });
    }

    // Adjust SQL to select admin_name and other details
    const sql = `
        SELECT admin_name, profile_image, eventCount, sanctionCount, userCount 
        FROM admins 
        WHERE admin_id = ?`;

    db.query(sql, [admin_id], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: "An error occurred." });
        }

        if (results.length > 0) {
            // Return admin details including admin_name
            res.status(200).json(results[0]);
        } else {
            res.status(404).json({ success: false, message: "Admin not found." });
        }
    });
});





// app.post('/students/login', (req, res) => {
//     const { student_id, password } = req.body;

//     if (!student_id || !password) {
//         return res.status(400).json({ success: false, message: "Student ID and password are required." });
//     }

//     const sql = "SELECT first_name, last_name FROM students WHERE student_id = ? AND password = ?";
//     db.query(sql, [student_id, password], (err, results) => {
//         if (err) {
//             console.error("Database error:", err);
//             return res.status(500).json({ success: false, message: "An error occurred." });
//         }

//         if (results.length > 0) {
//             const { first_name, last_name } = results[0];
//             return res.status(200).json({
//                 success: true,
//                 message: "Login successful.",
//                 student: { first_name, last_name }
//             });
//         } else {
//             return res.status(401).json({ success: false, message: "Invalid Student ID or password." });
//         }
//     });
// });

//---------------------------------------------------------------------------------------------------------------------------------
//display students
app.get("/", (req, res) => {
    const sql = "SELECT * FROM students";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error fetching data", error: err });
        }
        return res.json(data);
    });
});

// Add a route to fetch events for specific course and year level
app.get('/events/student-specific', (req, res) => {
    const { course, yearlevel} = req.query;

    if (!course || !yearlevel) {
        return res.status(400).json({ message: 'Missing course or year level parameters.' });
    }

    const query = `
        SELECT * 
        FROM events 
        WHERE FIND_IN_SET(?, course) > 0 
          AND FIND_IN_SET(?, yearlevel) > 0
    `;
    db.query(query, [course, yearlevel], (err, results) => {
        if (err) {
            console.error("Error fetching student-specific events:", err);
            return res.status(500).json({ message: 'An error occurred while fetching events.' });
        }
        res.json(results);
    });
});

//display events
app.get("/events", (req, res) => {
    const query = "SELECT * FROM events";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching events:", err);
            return res.status(500).send("An error occurred while fetching events.");
        }
        res.json(results);
    });
});

// add event:
app.post('/addeventform', (req, res) => {
    const { eventName, venue, eventDate, eventTime, eventTimeEnd, yearlevel, course, sanction } = req.body;

    if (!eventName || !venue || !eventDate || !eventTime || !eventTimeEnd || !yearlevel || !course || !sanction) {
        return res.status(400).send({ message: 'Missing required fields.' });
    }

    const yearLevelStr = Array.isArray(yearlevel) ? yearlevel.join(', ') : yearlevel;
    const courseStr = Array.isArray(course) ? course.join(', ') : course;

    const query = `
      INSERT INTO events (eventName, venue, eventDate, eventTime, eventTimeEnd, yearlevel, course, sanction)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [eventName, venue, eventDate, eventTime, eventTimeEnd, yearLevelStr, courseStr, sanction];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Error inserting event:', err);
            return res.status(500).send({ message: 'An error occurred while adding the event.' });
        }
        res.status(201).send({ message: 'Event added successfully!', results });
    });
});

// Delete event
app.delete('/events/:id', (req, res) => {
    const sql = "DELETE FROM events WHERE id = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error('Error deleting event:', err);
            return res.status(500).json({ message: 'An error occurred while deleting the event.' });
        }
        res.json({ message: 'Event deleted successfully' });
    });
});

// Update event endpoint
app.put('/events/update/:id', (req, res) => {
  const { eventName, venue, eventDate, eventTime, eventTimeEnd, yearlevel, course, sanction } = req.body;

  // Check for missing required fields
  if (!eventName || !venue || !eventDate || !eventTime || !eventTimeEnd || !yearlevel || !course || !sanction) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Convert yearlevel and course arrays to comma-separated strings if they are arrays
  const yearLevelStr = Array.isArray(yearlevel) ? yearlevel.join(', ') : yearlevel;
  const courseStr = Array.isArray(course) ? course.join(', ') : course;

  // SQL query to update the event in the database
  const sql = `
    UPDATE events 
    SET 
      eventName = ?, 
      venue = ?, 
      eventDate = ?, 
      eventTime = ?, 
      eventTimeEnd = ?, 
      yearlevel = ?, 
      course = ?, 
      sanction = ? 
    WHERE id = ?;
  `;

  // Values to be updated in the database
  const values = [
    eventName,
    venue,
    eventDate,
    eventTime,
    eventTimeEnd,
    yearLevelStr,
    courseStr,
    sanction,
    req.params.id,  // Event ID from URL parameter
  ];

  // Execute the query
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating event:', err);
      return res.status(500).json({ message: 'Server error. Failed to update event.' });
    }

    // If no rows were updated, the event was not found
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    // Return success response
    res.status(200).json({ message: 'Event updated successfully!' });
  });
});


// Get single event endpoint for editing
app.get('/events/:id', (req, res) => {
    const sql = "SELECT * FROM events WHERE id = ?";
    
    db.query(sql, [req.params.id], (err, results) => {
        if (err) {
            console.error('Error fetching event:', err);
            return res.status(500).json({ message: 'Failed to fetch event', error: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(results[0]);
    });
});

//add students 
app.post('/studentform', (req, res) => {
    console.log("Received data:", req.body);
    const sql = "INSERT INTO students (first_name, last_name, student_id, password, gender, course, messenger_link, skill, yearlevel ) VALUES (?)";
    const values = [
        req.body.first_name,
        req.body.last_name,
        req.body.student_id,
        req.body.password,
        req.body.gender,
        req.body.course,
        req.body.messenger_link,
        req.body.skill,
        req.body.yearlevel,
    ];
    
    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ message: "Error inserting data", error: err });
        }
        return res.json({ message: "Student added successfully", data: data });
    });
});

//////////////////////////////////////////////////////////////////bsit update students//////////////////////////////////////////////////////
//1styear bsit
app.put('/firstyearlist/updatefrstyear/:id', (req, res) => {
    const sql = "UPDATE students SET first_name = ?, last_name = ?, student_id = ?, password = ?, gender = ?, course = ?, messenger_link = ?, skill = ?, yearlevel = ? WHERE id = ?";
    const values = [
        req.body.first_name,
        req.body.last_name,
        req.body.student_id,
        req.body.password,
        req.body.gender,
        req.body.course,
        req.body.messenger_link,
        req.body.skill,
        req.body.yearlevel,
    ];
    db.query(sql, [...values, req.params.id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to update the record.", error: err });
        }
        res.json({ message: "Record updated successfully." });
    });
});

app.get('/firstyearlist/updatefrstyear/:id', (req, res) => {
    const sql = "SELECT * FROM students WHERE id = ?";
    db.query(sql, [req.params.id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to fetch student data.", error: err });
        }
        res.json(data[0]);
    });
});

//2ndyear bsit
app.put('/bsitsecondyearlist/updatesecondyear/:id', (req, res) => {
    const sql = "UPDATE students SET first_name = ?, last_name = ?, student_id = ?, password = ?, gender = ?, course = ?, messenger_link = ?, skill = ?, yearlevel = ? WHERE id = ?";
    const values = [
        req.body.first_name,
        req.body.last_name,
        req.body.student_id,
        req.body.password,
        req.body.gender,
        req.body.course,
        req.body.messenger_link,
        req.body.skill,
        req.body.yearlevel,
    ];
    db.query(sql, [...values, req.params.id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to update the record.", error: err });
        }
        res.json({ message: "Record updated successfully." });
    });
});

app.get('/bsitsecondyearlist/updatesecondyear/:id', (req, res) => {
    const sql = "SELECT * FROM students WHERE id = ?";
    db.query(sql, [req.params.id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to fetch student data.", error: err });
        }
        res.json(data[0]);
    });
});

//3rdyear bsit
app.put('/bsitthirdyearlist/updatethirdyear/:id', (req, res) => {
    const sql = "UPDATE students SET first_name = ?, last_name = ?, student_id = ?, password = ?, gender = ?, course = ?, messenger_link = ?, skill = ?, yearlevel = ? WHERE id = ?";
    const values = [
        req.body.first_name,
        req.body.last_name,
        req.body.student_id,
        req.body.password,
        req.body.gender,
        req.body.course,
        req.body.messenger_link,
        req.body.skill,
        req.body.yearlevel,
    ];
    db.query(sql, [...values, req.params.id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to update the record.", error: err });
        }
        res.json({ message: "Record updated successfully." });
    });
});

app.get('/bsitthirdyearlist/updatethirdyear/:id', (req, res) => {
    const sql = "SELECT * FROM students WHERE id = ?";
    db.query(sql, [req.params.id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to fetch student data.", error: err });
        }
        res.json(data[0]);
    });
});

//4thyear bsit
app.put('/bsitfourthyearlist/updatefourthyear/:id', (req, res) => {
    const sql = "UPDATE students SET first_name = ?, last_name = ?, student_id = ?, password = ?, gender = ?, course = ?, messenger_link = ?, skill = ?, yearlevel = ? WHERE id = ?";
    const values = [
        req.body.first_name,
        req.body.last_name,
        req.body.student_id,
        req.body.password,
        req.body.gender,
        req.body.course,
        req.body.messenger_link,
        req.body.skill,
        req.body.yearlevel,
    ];
    db.query(sql, [...values, req.params.id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to update the record.", error: err });
        }
        res.json({ message: "Record updated successfully." });
    });
});

app.get('/bsitfourthyearlist/updatefourthyear/:id', (req, res) => {
    const sql = "SELECT * FROM students WHERE id = ?";
    db.query(sql, [req.params.id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to fetch student data.", error: err });
        }
        res.json(data[0]);
    });
});
//////////////////////////////////////////////////////////////////blis update students//////////////////////////////////////////////////////
//1styear blis
app.put('/BLISfirstyearlist/updatefirstyearblis/:id', (req, res) => {
    const sql = "UPDATE students SET first_name = ?, last_name = ?, student_id = ?, password = ?, gender = ?, course = ?, messenger_link = ?, skill = ?, yearlevel = ? WHERE id = ?";
    const values = [
        req.body.first_name,
        req.body.last_name,
        req.body.student_id,
        req.body.password,
        req.body.gender,
        req.body.course,
        req.body.messenger_link,
        req.body.skill,
        req.body.yearlevel,
    ];
    db.query(sql, [...values, req.params.id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to update the record.", error: err });
        }
        res.json({ message: "Record updated successfully." });
    });
});

app.get('/BLISfirstyearlist/updatefirstyearblis/:id', (req, res) => {
    const sql = "SELECT * FROM students WHERE id = ?";
    db.query(sql, [req.params.id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to fetch student data.", error: err });
        }
        res.json(data[0]);
    });
});

//2ndyear blis
app.put('/BLISsecondyearlist/updatesecondyearblis/:id', (req, res) => {
    const sql = "UPDATE students SET first_name = ?, last_name = ?, student_id = ?, password = ?, gender = ?, course = ?, messenger_link = ?, skill = ?, yearlevel = ? WHERE id = ?";
    const values = [
        req.body.first_name,
        req.body.last_name,
        req.body.student_id,
        req.body.password,
        req.body.gender,
        req.body.course,
        req.body.messenger_link,
        req.body.skill,
        req.body.yearlevel,
    ];
    db.query(sql, [...values, req.params.id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to update the record.", error: err });
        }
        res.json({ message: "Record updated successfully." });
    });
});

app.get('/BLISsecondyearlist/updatesecondyearblis/:id', (req, res) => {
    const sql = "SELECT * FROM students WHERE id = ?";
    db.query(sql, [req.params.id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to fetch student data.", error: err });
        }
        res.json(data[0]);
    });
});

//delete students
app.delete('/students/:id', (req, res) => {
    const sql = "DELETE FROM students WHERE id = ?";
    const id = req.params.id;

    db.query(sql, [id], (err,data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
});



// Set up Multer storage and file handling
const upload = multer({ dest: 'uploads/' }); // Set the upload directory

app.post('/events/submit', upload.single('proof'), (req, res) => {
    const { studentId, eventId, reason } = req.body;
    const proofFile = req.file?.filename;

    if (!studentId || !eventId || !proofFile || !reason) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const sql = "INSERT INTO event_attendance (student_id, event_id, proof_file, reason) VALUES (?, ?, ?, ?)";
    db.query(sql, [studentId, eventId, proofFile, reason], (err, result) => {
        if (err) {
            console.error('Database error:', err.message);
            return res.status(500).json({ success: false, message: 'Database error.' });
        }
        res.status(200).json({ success: true, message: 'Event form submitted successfully.' });
    });
});




// Endpoint to fetch events from the database
app.get('/events', (req, res) => {
    const query = 'SELECT * FROM events'; // Adjust according to your table structure
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching events:', err);
            return res.status(500).json({ message: 'Failed to fetch events.' });
        }
        res.json(results); // Send back the events data to the front-end
    });
});

