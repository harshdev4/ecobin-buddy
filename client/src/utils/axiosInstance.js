import axios from 'axios';

export const axiosInstance = axios.create({
    // baseURL: 'http://localhost:5000/api',
    baseURL: "https://ecobin-buddy.onrender.com/api" || 'http://localhost:3000/api',
    withCredentials: true,
})