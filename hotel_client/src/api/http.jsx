import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:5007',
    withCredentials: true
});

export default http;