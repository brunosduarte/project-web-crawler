import { IScrapResult } from '@/entities/IScrapResult'
import { api } from '@/lib/axios'

export async function getScrapResults(): Promise<IScrapResult[]> {
  const { data } = await api.get('/nodes')
  return data
}
