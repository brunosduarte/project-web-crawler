/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

export async function getScrapStatus(): Promise<{
  pending: number
  total: number
  percentDone: number
}> {
  const { data } = await api.get('/queue')
  try {
    return data
  } catch (e: AxiosError | any) {
    console.error('Error status: ', e?.message)
    return e?.message || 'Unknown error occurred'
  }
}
