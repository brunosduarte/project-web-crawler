/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

export async function getScrapStatus(): Promise<{
  pending: number
  total: number
  percentDone: number
}> {
  try {
    const { data } = await api.get('/queue')
    return data
  } catch (e: AxiosError | any) {
    console.error('Error queue:', e?.message)
    return e?.message || 'Unknown error occurred'
  }
}
