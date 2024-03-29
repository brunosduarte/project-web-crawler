import { api } from '@/lib/axios'

export async function sendURL(url: string) {
  const sendURL = await api.post('/domain', {
    domain: url,
  })
  return sendURL
}
