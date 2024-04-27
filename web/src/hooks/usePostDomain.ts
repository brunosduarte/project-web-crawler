import { useMutation } from 'react-query'

import { queryClient } from '@/lib/react-query'
import { sendURL } from '@/services/sendURL'

export function usePostDomain() {
  return useMutation({
    mutationFn: sendURL,
    retry: 3,
    onSuccess: () => {
      queryClient.invalidateQueries(['getTree', 'getScrapStatus'])
    },
    onError: () => {
      console.log('Error', sendURL)
    },
    // refetchInterval: 1_000,
  })
}