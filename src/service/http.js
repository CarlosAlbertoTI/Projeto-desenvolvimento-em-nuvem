import axios from "axios";
const apiInstance = axios.create({
    baseURL: 'http://44.205.231.97:8080',
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 1000
});

export default apiInstance