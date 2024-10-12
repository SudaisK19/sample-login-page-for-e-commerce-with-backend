// src/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #add8e6; /* Light blue background */
    text-align: center;
`;

const Header = styled.h1`
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
`;

const Label = styled.label`
    font-size: 16px;
    font-weight: bold;
    color: #333;
`;

const Input = styled.input`
    padding: 10px;
    width: 100%;
    max-width: 400px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #007bff; /* Blue button */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3; /* Darker blue on hover */
    }
`;

const Message = styled.p`
    color: red;
`;

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', { username, password }, { withCredentials: true });
            setMessage(response.data.message);
            navigate('/profile'); // Redirect to profile after successful login
        } catch (error) {
            console.error('Error logging in:', error);
            setMessage(error.response?.data?.message || 'Invalid username or password');
        }
    };

    return (
        <Container>
            <Header>Login</Header>
            <Form onSubmit={handleLogin}>
                <div>
                    <Label>Username:</Label>
                    <Input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <Label>Password:</Label>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <Button type="submit">Login</Button>
                {message && <Message>{message}</Message>}
            </Form>
            <Button onClick={() => navigate('/')}>Go to Home</Button> {/* Navigate to Home */}
        </Container>
    );
};

export default Login;
