import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Adjust the URL based on your server

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

