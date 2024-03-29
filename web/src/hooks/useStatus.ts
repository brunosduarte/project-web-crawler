import { useQuery } from 'react-query'

import { getScrapStatus } from '@/services/getScrapStatus'

export function useStatus() {
  return useQuery({
    queryFn: getScrapStatus,
    queryKey: ['getScrapStatus'],
    // refetchInterval: 10 * 1000,
  })
}
