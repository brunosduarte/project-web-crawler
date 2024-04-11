import { useQuery } from 'react-query'

import { getTree } from '@/services/getTree'

export function useTree({ haveDomain }: { haveDomain: boolean }) {
  return useQuery({
    queryFn: getTree,
    queryKey: ['getTree'],
    retry: 1,
    enabled: haveDomain,
  })
}
