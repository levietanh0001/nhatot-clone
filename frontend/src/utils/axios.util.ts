import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_BASE_URL;

// 1. create instance with baseUrl
export const axiosClient = axios.create({
  baseURL,
  timeout: 5000, // allowed time for an open request before being canceled (milliseconds)
  headers: {
    'Content-Type': 'application/json',
  },
});
