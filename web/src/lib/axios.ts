import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://sitemapper-v1-2.onrender.com',
  // baseURL: 'https://project-web-crawler.onrender.com',
  // baseURL: 'http://localhost:3000',
})
