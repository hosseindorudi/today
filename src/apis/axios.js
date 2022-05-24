import axios from 'axios';
const BASE_URL = 'http://172.16.1.138:81';

export default axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});