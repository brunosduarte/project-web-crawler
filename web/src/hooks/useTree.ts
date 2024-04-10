import { useQuery } from 'react-query'

import { getTree } from '@/services/getTree'

export function useTree() {
  return useQuery({
    queryFn: getTree,
    queryKey: ['getTree'],
    retry: 1,
    enabled: false,
    // refetchInterval: 10 * 1000,
  })
}
