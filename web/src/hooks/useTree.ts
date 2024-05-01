/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useQuery } from 'react-query'

import { getTree } from '@/services/getTree'

export function useTree({ isFetched }: { isFetched: boolean }) {
  const [isEnabled, setEnabled] = useState(true)
  return useQuery({
    queryFn: getTree,
    queryKey: ['getTree', isFetched],
    enabled: isFetched && isEnabled,
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
      console.error('Error getting tree: ', e?.message)
      return e?.message || 'Unknown error'
    },
  })
}
