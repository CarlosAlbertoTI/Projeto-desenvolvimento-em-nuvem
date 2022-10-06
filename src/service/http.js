import axios from "axios";
const apiInstance = axios.create({
    baseURL: 'http://backendloadbalancer-197796003.us-east-1.elb.amazonaws.com:8080',
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
    },

    timeout: 1000
});

export default apiInstance