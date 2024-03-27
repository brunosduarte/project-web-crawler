import { useMutation } from 'react-query'

import { sendURL } from '@/services/api'

export function useMutate() {
  return useMutation({
    mutationFn: sendURL,
    // mutationKey: ['sendURL'],
    retry: 3,
  })
}
