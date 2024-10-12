// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Register from './Register.jsx';
import Login from './Login.jsx';
import Profile from './Profile.jsx'; // Updated from Dashboard to Profile

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                {/* Add a catch-all route for undefined paths */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

// Optional: Create a NotFound component to handle unmatched routes
const NotFound = () => (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>404 - Page Not Found</h2>
        <a href="/">Go to Home</a>
    </div>
);

export default App;
