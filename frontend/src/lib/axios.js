import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: `https://gossip-chatting.onrender.com/`,
    withCredentials: true,
});

export default axiosInstance;