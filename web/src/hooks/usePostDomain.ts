/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from 'react-query'

import { queryClient } from '@/lib/react-query'
import { sendURL } from '@/services/sendURL'

export function usePostDomain() {
  return useMutation({
    mutationFn: sendURL,
    retry: 3,
    onSuccess: () => {
      try {
        console.log('noError:', sendURL.arguments[0])
        queryClient.invalidateQueries(['getTree', 'getScrapStatus'])
      } catch (err: any) {
        return err?.message
      }
    },
    onError: (e: any) => {
      console.error('Error: ', e?.message)
      return e?.message || 'Unknown error'
    },
  })
}
