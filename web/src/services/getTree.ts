import { api } from '@/lib/axios'

export async function getTree(): Promise<{
  done: boolean
  url: string
  title: string
  children: unknown
}> {
  const { data } = await api.get('/tree')
  return data
}
