import { useQuery } from 'react-query'

import { getScrapStatus } from '@/services/getScrapStatus'

export function useStatus({ haveDomain }: { haveDomain: boolean }) {
  return useQuery({
    queryFn: getScrapStatus,
    queryKey: ['getScrapStatus', haveDomain],
    refetchInterval: 1_000,
    enabled: haveDomain,
    throwOnError: (error) => error.response?.status >= 500,
  })
}
