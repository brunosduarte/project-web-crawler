import { IScrapResult } from '@/entities/IScrapResult'

import { api } from './axiosConfig'

export async function getScrapResults(): Promise<IScrapResult[]> {
  const { data } = await api.get('/nodes')
  return data
}

export async function getScrapStatus(): Promise<{
  pending: number
  total: number
  percentDone: number
}> {
  const { data } = await api.get('/queue')
  return data
}

export async function sendURL(url: string) {
  const sendURL = await api.post('/domain', {
    domain: url,
  })
  return sendURL
}

export async function getTree(): Promise<{
  done: boolean
  url: string
  title: string
  children: unknown
}> {
  const { data } = await api.get('/tree')
  return data
}
