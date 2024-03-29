import { api } from '@/lib/axios'

export async function getScrapStatus(): Promise<{
  pending: number
  total: number
  percentDone: number
}> {
  const { data } = await api.get('/queue')
  return data
}
