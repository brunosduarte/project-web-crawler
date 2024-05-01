/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useQuery } from 'react-query'

import { getScrapStatus } from '@/services/getScrapStatus'

export function useStatus({ haveDomain }: { haveDomain: boolean }) {
  const [isEnabled, setEnabled] = useState(true)
  return useQuery({
    queryFn: getScrapStatus,
    queryKey: ['getScrapStatus', haveDomain],
    enabled: haveDomain && isEnabled,
    refetchInterval: 1_000,
    retry: 3,
    onSuccess: () => {
      try {
        setEnabled(true)
      } catch (err: any) {
        return err?.message
      }
    },
    onError: (e: any) => {
      setEnabled(false)
      console.error('Error getting status: ', e?.message)
      return e?.message || 'Unknown error'
    },
  })
}
