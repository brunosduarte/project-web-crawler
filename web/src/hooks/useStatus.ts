import { useQuery } from 'react-query'

import { getScrapStatus } from '@/services/getScrapStatus'

export function useStatus() {
  return useQuery({
    queryFn: getScrapStatus,
    queryKey: ['getScrapStatus'],
    enabled: false,
    // refetchInterval: 10 * 1000,
  })
}
