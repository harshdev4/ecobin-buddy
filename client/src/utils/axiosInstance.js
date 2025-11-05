import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://ecobin-buddy.onrender.com/api" || 'http://localhost:3000/api',
    withCredentials: true,
})