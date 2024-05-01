import { describe, expect, it, vi } from 'vitest'

import { api } from '@/lib/axios'

import { getScrapStatus } from './getScrapStatus'

vi.mock('@/lib/axios', () => ({
  api: {
    get: vi.fn(),
  },
}))

describe('getScrapStatus function', () => {
  it('should return the correct status object when API call is successful', async () => {
    const mockData = {
      pending: 5,
      total: 100,
      percentDone: 5,
    }
    api.get.mockResolvedValue({ data: mockData })

    const result = await getScrapStatus()
    expect(result).toEqual(mockData)
  })

  // it('should handle errors when API call fails', async () => {
  //   const errorMessage = 'Network error'
  //   api.get.mockRejectedValue(new Error(errorMessage))

  //   const result = await getScrapStatus()
  //   expect(result).toContain('Error status: ')
  //   expect(result).toContain(errorMessage)
  // })
})
