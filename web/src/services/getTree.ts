/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

export async function getTree(): Promise<{
  done: boolean
  url: string
  title: string
  children: unknown
}> {
  const { data } = await api.get('/tree')
  try {
    return data
  } catch (e: AxiosError | any) {
    console.error('Error tree: ', e?.message)
    return e?.message || 'Unknown error occurred'
  }
}
