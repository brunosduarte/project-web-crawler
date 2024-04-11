import { useQuery } from 'react-query'

import { getScrapStatus } from '@/services/getScrapStatus'

export function useStatus({ haveDomain }: { haveDomain: boolean }) {
  return useQuery({
    queryFn: getScrapStatus,
    queryKey: ['getScrapStatus', haveDomain],
    enabled: haveDomain,
    refetchInterval: 1 * 1000,
  })
}
