import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
    background-color: #add8e6; // Light blue background color
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
    margin-bottom: 20px;
`;

const Label = styled.label`
    margin: 10px 0;
    font-size: 18px;
    color: #333;
`;

const Input = styled.input`
    padding: 10px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 3px;
    width: 100%; // Full width for inputs
`;

const Button = styled.button`
    padding: 10px;
    background-color: #007bff; // Blue button color
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    margin-top: 20px;

    &:hover {
        background-color: #0056b3; // Darker blue on hover
    }
`;

const DeleteButton = styled.button`
    padding: 10px;
    background-color: #dc3545; // Red button color for delete
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    margin-top: 20px;

    &:hover {
        background-color: #c82333; // Darker red on hover
    }
`;

// Profile Component
const Profile = () => {
    const [userData, setUserData] = useState({});
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user profile data
        axios.get('http://localhost:3001/api/profile', { withCredentials: true })
            .then((response) => {
                setUserData(response.data);
                setUsername(response.data.username);
                setPassword(response.data.password);
            })
            .catch((error) => {
                console.error('Error fetching user profile:', error);
                navigate('/login'); // Redirect to login if unauthorized
            });
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3001/api/profile', { username, password }, { withCredentials: true })
            .then((response) => {
                alert(response.data.message);
            })
            .catch((error) => {
                console.error('Error updating profile:', error);
            });
    };

    const handleDelete = () => {
        axios.delete('http://localhost:3001/api/profile', { withCredentials: true })
            .then((response) => {
                alert(response.data.message);
                navigate('/register'); // Redirect to register after deleting account
            })
            .catch((error) => {
                console.error('Error deleting profile:', error);
            });
    };

    return (
        <Container>
            <Header>User Profile</Header>
            <Form onSubmit={handleUpdate}>
                <Label>Username:</Label>
                <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Label>Password:</Label>
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit">Update Profile</Button>
            </Form>
            <DeleteButton onClick={handleDelete}>Delete Profile</DeleteButton>
        </Container>
    );
};

export default Profile;
