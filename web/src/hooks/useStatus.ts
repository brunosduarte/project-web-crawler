/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from 'react-query'

import { queryClient } from '@/lib/react-query'
import { getScrapStatus } from '@/services/getScrapStatus'

export function useStatus({ haveDomain }: { haveDomain: boolean }) {
  return useQuery({
    queryFn: getScrapStatus,
    queryKey: ['getScrapStatus', haveDomain],
    refetchInterval: 1_000,
    // enabled: haveDomain,
    onError: (e: any) => {
      console.error('Error', e?.message)
      queryClient.invalidateQueries(['getTree', 'getScrapStatus'])
    },
  })
}
