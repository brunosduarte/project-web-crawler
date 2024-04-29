import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://project-web-crawler.onrender.com',
  // baseURL: 'http://localhost:3000',
})
