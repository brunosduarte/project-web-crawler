import axios from "axios";
import { IScrapResult } from "../entities/IScrapResult";

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

export async function searchCrawlDomain(url: string): Promise<{ url: string }> {
  const startCrawl = await api.post('/domain');
  //TODO waiting backend to finish
  return startCrawl;
}

export async function getTree(): Promise<{ done: boolean, url: string,  title: string, children: any }> {
  const { data } = await api.get('/tree');
  return data;
}