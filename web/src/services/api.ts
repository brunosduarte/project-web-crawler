import axios from "axios";
import { IScrapResult } from "../types/IScrapResult";

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