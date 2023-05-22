import axios from 'axios';
import {baseURL} from "../constants";

const api = axios.create({
    baseURL: baseURL,

});

api.interceptors.request.use((config) => {
    const apiKey = 'e454e630cd056e6159b3326042bb5df5';
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDU0ZTYzMGNkMDU2ZTYxNTliMzMyNjA0MmJiNWRmNSIsInN1YiI6IjY0NjUzY2Y3MjI5MzFhMDEzNmQzZDI4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PM0KUGBZgnWGdSMi-HU49024liWO8vdyScBUt9oDUl8';

    config.params = {
        ...config.params,
        api_key: apiKey,
    };

    config.headers.Authorization = `Bearer ${token}`;

    return config;
});

export default api;