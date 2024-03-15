import axios from 'axios';
import { setup } from '@enkidevs/axios-sisyphus';

const axiosInstance = axios.create({
  baseURL: 'https://your-backend-domain.com', // Adjust based on your backend
  timeout: 10000,
});

setup(axiosInstance, {
  retries: 3,
  retryCondition: (error) => error.response?.status >= 500,
  onRetry: (retryCount, error, requestConfig) => {
    console.log(`Retry ${retryCount} for ${requestConfig.url}`);
  },
});

export default axiosInstance;
