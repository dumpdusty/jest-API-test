import axios from "axios";

export const request = axios.create({
    baseURL: 'http://localhost:4000',
    timeout: 15000,
    validateStatus: () => true,
})