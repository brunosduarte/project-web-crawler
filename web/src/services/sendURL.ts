/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios'

import { api } from '@/lib/axios'

export async function sendURL(
  url: string,
): Promise<{ statusReceived: number; errorMessage?: string }> {
  try {
    const response: AxiosResponse = await api.post('/domain', {
      domain: url,
    })
    console.log('Status Code:', response.status)
    return { statusReceived: response.status }
  } catch (error: any) {
    console.error('Error sending URL:', error.message)
    return error.message
  }
}
