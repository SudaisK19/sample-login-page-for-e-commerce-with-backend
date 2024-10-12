const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Change to your frontend URL
    credentials: true,
}));
app.use(bodyParser.json());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Jealous278',
    database: 'loigin_system'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL connected...');
});

// Register Route
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Check if the username already exists
    const checkQuery = 'SELECT * FROM users WHERE username = ?';
    db.query(checkQuery, [username], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Insert the new user into the database
        const insertQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query(insertQuery, [username, password], (err) => {
            if (err) {
                return res.status(500).json({ message: 'Internal server error' });
            }

            res.json({ message: 'User registered successfully' });
        });
    });
});

// Login Route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

    db.query(query, [username, password], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length > 0) {
            req.session.user = { id: results[0].id, username: results[0].username };
            return res.json({ message: 'Login successful', user: results[0] });
        } else {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
    });
});

// Profile Route - Fetch user data
app.get('/api/profile', (req, res) => {
    if (req.session.user) {
        const userId = req.session.user.id;

        const query = 'SELECT * FROM users WHERE id = ?';
        db.query(query, [userId], (err, results) => {
            if (err) {
                console.error('Error querying the database:', err);
                return res.status(500).json({ message: 'Internal server error.' });
            }

            if (results.length > 0) {
                const userData = {
                    id: results[0].id,
                    username: results[0].username,
                };
                res.json(userData);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

// Update Profile Route
app.put('/api/profile', (req, res) => {
    if (req.session.user) {
        const userId = req.session.user.id;
        const { username, password } = req.body;

        const updateQuery = 'UPDATE users SET username = ?, password = ? WHERE id = ?';
        db.query(updateQuery, [username, password, userId], (err, results) => {
            if (err) {
                console.error('Error updating user profile:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (results.affectedRows > 0) {
                res.json({ message: 'Profile updated successfully' });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

// Delete Profile Route
app.delete('/api/profile', (req, res) => {
    if (req.session.user) {
        const userId = req.session.user.id;

        const deleteQuery = 'DELETE FROM users WHERE id = ?';
        db.query(deleteQuery, [userId], (err, results) => {
            if (err) {
                console.error('Error deleting user profile:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (results.affectedRows > 0) {
                req.session.destroy(); // Destroy the session
                res.json({ message: 'Profile deleted successfully' });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
