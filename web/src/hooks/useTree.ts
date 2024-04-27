import { useQuery } from 'react-query'

import { getTree } from '@/services/getTree'

export function useTree({ haveDomain }: { haveDomain: boolean }) {
  return useQuery({
    queryFn: getTree,
    queryKey: ['getTree', haveDomain],
    retry: 3,
    refetchInterval: 1_000,
    enabled: haveDomain,
  })
}
