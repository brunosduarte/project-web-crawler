import { AxiosResponse } from 'axios'

import { api } from '@/lib/axios'

export async function sendURL(url: string): Promise<number> {
  const response: AxiosResponse = await api.post('/domain', {
    domain: url,
  })
  const statusReceived = response.status
  console.log(statusReceived)
  return statusReceived
}
