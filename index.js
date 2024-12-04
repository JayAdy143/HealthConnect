const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Database connection
const db = mysql.createPool({
    host: 'localhost',     // your database host
    user: 'root',          // your database username
    password: '24709374',          // your database password
    database: 'Telemed'   // your database name
});


// -----------------------------
// Patient Routes
// -----------------------------

// Route to get the list of patients
app.get('/patients', (req, res) => {
    const query = 'SELECT * FROM patients';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to retrieve patients data.' });
        }
        res.json(results);
    });
});

// Route to insert patients
app.post('/patients', (req, res) => {
    const { name, age, gender, contact } = req.body; // Get patient details from request body

    // Basic validation
    if (!name || !age || !gender || !contact) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // SQL query to insert data into the patients table
    const query = 'INSERT INTO patients (name, age, gender, contact) VALUES (?, ?, ?, ?)';

    // Execute the query
    db.query(query, [name, age, gender, contact], (error, results) => {
        if (error) {
            console.error('Database query error:', error);
            return res.status(500).json({ error: 'Database error' });
        }

        // Respond with success message
        res.status(201).json({ message: 'Patient added successfully', patientId: results.insertId });
    });
});

// -----------------------------
// Doctor Routes
// -----------------------------

// Route to get the list of doctors
app.get('/doctors', (req, res) => {
    const query = 'SELECT * FROM doctors';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to retrieve doctors data.' });
        }
        res.json(results);
    });
});

// Route to insert doctors
app.post('/doctors', (req, res) => {
    const { name, specialization, email, phone, password } = req.body; // Get doctor details from request body

    // Basic validation
    if (!name || !specialization || !email || !phone || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // SQL query to insert data into the doctors table
    const query = 'INSERT INTO doctors (name, specialization, email, phone, password) VALUES (?, ?, ?, ?, ?)';

    // Execute the query
    db.query(query, [name, specialization, email, phone, password], (error, results) => {
        if (error) {
            console.error('Database query error:', error);
            return res.status(500).json({ error: 'Database error' });
        }

        // Respond with success message
        res.status(201).json({ message: 'Doctor added successfully', doctorId: results.insertId });
    });
});

// -----------------------------
// Appointment Routes
// -----------------------------

// Route to get the list of appointments
app.get('/appointments', (req, res) => {
    const query = 'SELECT * FROM appointments';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to retrieve appointments data.' });
        }
        res.json(results);
    });
});

// Route to insert appointments
app.post('/appointments', (req, res) => {
    const { date, time, reason, patientId } = req.body; // Get appointment details from request body

    // Basic validation
    if (!date || !time || !reason || !patientId) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // SQL query to insert data into the appointments table
    const query = 'INSERT INTO appointments (date, time, reason, patientId) VALUES (?, ?, ?, ?)';

    // Execute the query
    db.query(query, [date, time, reason, patientId], (error, results) => {
        if (error) {
            console.error('Database query error:', error);
            return res.status(500).json({ error: 'Database error' });
        }

        // Respond with success message
        res.status(201).json({ message: 'Appointment added successfully', appointmentId: results.insertId });
    });
});


// Start the server on port 3001
app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});
