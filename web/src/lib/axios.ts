import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3000',
})

// import * { AxiosResponse }as sisyphus from '@enkidevs/axios-sisyphus';

// type Config<R = any> = {
//   retries?: number;
//   responseFailedFilter?: (response: AxiosResponse<R>) => Promise<boolean>;
//   failedIterationCallback?: (index: number) => Promise<void>;
// };

// const config: Config = {
//   retries: 3,
//   responseFailedFilter: async (response) => {
//     return response.status !== 200;
//   },
//   failedIterationCallback: async (index) => {
//     console.log(`Failed iteration ${index}`);
//   },
// };

// const axiosConfig = {
//   url: 'https://localhost:3000',

// };

// sisyphus.get(config as any, axiosConfig);
// sisyphus.post(config as any, axiosConfig);

// let axiosConfig = {
//   headers: {
//       'Content-Type': 'application/json;charset=UTF-8',
//       "Access-Control-Allow-Origin": "*",
//   }
// };

// import { setup } from '@enkidevs/axios-sisyphus'

// const axiosInstance = axios.create({
//   baseURL: 'https://your-backend-domain.com',
//   timeout: 10000,
// })

// setup(axiosInstance, {
//   retries: 3,
//   retryCondition: (error) => error.response?.status >= 500,
//   onRetry: (retryCount, error, requestConfig) => {
//     console.log(`Retry ${retryCount} for ${requestConfig.url}`)
//   },
// })

// export default axiosInstance
