import { useQuery } from 'react-query'

import { getScrapResults } from '@/services/getScrapResults'

export function useResults() {
  return useQuery({
    queryFn: getScrapResults,
    queryKey: ['getScrapResults'],
    retry: 3,
  })
}
