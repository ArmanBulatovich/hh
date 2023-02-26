import axios from 'axios';

const API_ROOT = 'https://whale-app-gd6r4.ondigitalocean.app/tech-hunter/';

const apiClient = axios.create({
  baseURL: API_ROOT,
  headers: {
    'Content-Type': 'application/json',
  },
});


export { apiClient };