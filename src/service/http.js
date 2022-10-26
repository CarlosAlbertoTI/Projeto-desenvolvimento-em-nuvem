import axios from "axios";
const apiInstance = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 1000000
});

export default apiInstance