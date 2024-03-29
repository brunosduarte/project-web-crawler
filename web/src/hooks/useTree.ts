import { useQuery } from 'react-query'

import { getTree } from '@/services/getTree'

export function useTree() {
  return useQuery({
    queryFn: getTree,
    queryKey: ['getTree'],
    // refetchInterval: 10 * 1000,
    retry: 1,
  })
}
