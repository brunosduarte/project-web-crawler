import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://project-web-crawler-production.up.railway.app/',
  // baseURL: 'http://localhost:3000',
})
