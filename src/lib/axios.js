import axios from 'axios';

const api = axios.create({
  baseURL: 'https://studyforest-n1at.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 30000, // 30초로 증가
});

export default api;
