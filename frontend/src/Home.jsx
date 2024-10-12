// frontend/src/Home.jsx
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

const StyledLink = styled(Link)`
    display: block;
    margin-top: 15px;
    color: #007bff;
    text-decoration: none;
    font-size: 18px;
`;

const Home = () => {
    return (
        <Container>
            <Header>Welcome!</Header>
            <p>Select an option:</p>
            <StyledLink to="/register">Register</StyledLink> | <StyledLink to="/login">Login</StyledLink>
        </Container>
    );
};

export default Home;
