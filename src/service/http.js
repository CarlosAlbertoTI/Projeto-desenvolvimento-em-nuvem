import axios from "axios";

let backend_ip = process.env.BACKEND_IP
console.log.log(backend_ip)
const apiInstance = axios.create({
    baseURL: backend_ip=!null?backend_ip:'http://44.205.231.97:8080',
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 1000000
});

export default apiInstance