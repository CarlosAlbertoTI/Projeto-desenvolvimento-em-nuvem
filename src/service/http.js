import axios from "axios";
const apiInstance = axios.create({
    baseURL: 'https://example.io/api/',
    timeout: 1000
});

export default apiInstance