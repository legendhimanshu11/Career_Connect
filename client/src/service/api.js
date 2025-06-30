import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Change this to your production URL when deploying
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;