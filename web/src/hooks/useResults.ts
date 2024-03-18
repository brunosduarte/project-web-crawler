import { useQuery } from 'react-query'

import { getScrapResults } from '@/services/api'

export function useResults() {
  return useQuery({
    queryFn: getScrapResults,
    queryKey: ['getScrapResults'],
    retry: 3,
  })
}
