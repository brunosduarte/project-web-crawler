import { useQuery } from 'react-query'

import { getScrapResults } from '@/services/getScrapResults'

export function useResults({ haveDomain }: { haveDomain: boolean }) {
  return useQuery({
    queryFn: getScrapResults,
    queryKey: ['getScrapResults', haveDomain],
    retry: 3,
    enabled: haveDomain,
    refetchInterval: 1 * 1000,
  })
}
