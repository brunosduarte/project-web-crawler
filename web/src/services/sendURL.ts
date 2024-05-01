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
    return { statusReceived: response.status }
  } catch (e: AxiosError | any) {
    throw new Error((e as Error).message)
  }
}
