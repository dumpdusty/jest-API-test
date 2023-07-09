import axios from 'axios'

export const request = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 15000,
  validateStatus: () => true,
})

export const client = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 15000,
  validateStatus: () => true,
  headers: { Authorization: `Bearer ${process.env.TOKEN}` },
})
