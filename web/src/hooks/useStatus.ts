import { useQuery } from 'react-query'

import { getScrapStatus } from '@/services/api'

export function useStatus() {
  return useQuery({
    queryFn: getScrapStatus,
    queryKey: ['getScrapStatus'],
    // refetchInterval: 10 * 1000,
  })
}
