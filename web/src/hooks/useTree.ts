/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from 'react-query'

import { queryClient } from '@/lib/react-query'
import { getTree } from '@/services/getTree'

export function useTree({ haveDomain }: { haveDomain: boolean }) {
  return useQuery({
    queryFn: getTree,
    queryKey: ['getTree', haveDomain],
    retry: 3,
    refetchInterval: 1_000,
    // enabled: haveDomain,
    onError: (e: any) => {
      console.error('Error', e?.message)
      queryClient.invalidateQueries(['getTree', 'getScrapStatus'])
    },
  })
}
