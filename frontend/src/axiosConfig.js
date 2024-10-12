// frontend/src/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001', // Backend server URL
    withCredentials: true, // Send cookies with requests
});

export default instance;
