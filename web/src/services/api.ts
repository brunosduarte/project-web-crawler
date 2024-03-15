import axios from "axios";
//import * { AxiosResponse }as sisyphus from '@enkidevs/axios-sisyphus';
import { IScrapResult } from "@/entities/IScrapResult";

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

//sisyphus.get(config as any, axiosConfig);
//sisyphus.post(config as any, axiosConfig);

let axiosConfig = {
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
  }
};

const api = axios.create({
  baseURL: 'http://localhost:3000'
})

export async function getScrapResults(): Promise<IScrapResult[]> {
  const { data } = await api.get('/nodes');
  return data;
}

export async function getScrapStatus(): Promise<{ pending: number, total: number, percentDone: number  }> {
  const { data } = await api.get('/queue');
  return data;
}

export async function crawlURL(url: string) {
  const sendURL = await api.post('/domain',{
    domain: url
  });
  //TODO waiting backend to finish
  return sendURL;
}

export async function getTree(): Promise<{ done: boolean, url: string,  title: string, children: any }> {
  const { data } = await api.get('/tree');
  return data;
}