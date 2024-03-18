import { useQuery } from 'react-query'

import { getTree } from '@/services/api'

export function useTree() {
  return useQuery({
    queryFn: getTree,
    queryKey: ['getTree'],
    // refetchInterval: 100000,
    retry: 1,
  })
}
