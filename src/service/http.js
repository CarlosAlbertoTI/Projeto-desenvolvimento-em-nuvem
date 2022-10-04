import axios from "axios";
const apiInstance = axios.create({
    baseURL: 'http://54.145.67.182:8080',
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
    },

    timeout: 1000
});

export default apiInstance