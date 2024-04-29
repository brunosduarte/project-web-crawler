/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosError, AxiosResponse } from 'axios'

import { api } from '@/lib/axios'

export async function sendURL(
  url: string,
): Promise<{ statusReceived: number; errorMessage?: string }> {
  try {
    const response: AxiosResponse = await api.post('/domain', {
      domain: url,
    })
    // console.log('Status Code:', response.status)
    return { statusReceived: response.status }
  } catch (e: AxiosError | any) {
    console.error('Error sending URL:', e?.message)
    return {
      statusReceived: e?.response?.status || 500,
      errorMessage: e?.message || 'Unknown error',
    }
  }
}
