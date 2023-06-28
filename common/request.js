import axios from "axios";

export const request = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 15000,
    validateStatus: () => true,
})