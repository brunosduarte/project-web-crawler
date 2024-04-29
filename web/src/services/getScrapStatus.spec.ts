// tests/getScrapStatus.test.ts
import { api } from '@/lib/axios'

import { getScrapStatus } from './getScrapStatus'

vi.mock('@/lib/axios', () => ({
  api: {
    get: vi.fn(),
  },
}))

describe('getScrapStatus', () => {
  it('returns the correct status when the API call succeeds', async () => {
    const mockData = {
      pending: 5,
      total: 100,
      percentDone: 5,
    }
    ;(api.get as vi.Mock).mockResolvedValueOnce({ data: mockData })

    const result = await getScrapStatus()
    await expect(result).toEqual(mockData)
  })

  it('returns an error message when the API call fails', async () => {
    const errorMessage = 'Network error'
    ;(api.get as vi.Mock).mockResolvedValueOnce({ message: errorMessage })

    const result = await getScrapStatus()
    expect(result).toEqual(errorMessage)
    // expect(console.error).toHaveBeenCalledWith('Error queue:', errorMessage)
  })

  it('handles unexpected return types', async () => {
    await api.get.mockResolvedValue(null)

    const result = await getScrapStatus()
    console.log('result', result)
    // await expect(result).toBe('Unknown error occurred')
  })
})

// import { api } from '@/lib/axios'

// import { getScrapStatus } from './getScrapStatus'

// vi.mock('@/lib/axios', () => ({
//   api: {
//     get: vi.fn(),
//   },
// }))

// describe('getScrapStatus', () => {
//   it('should call the API endpoint and return the data', async () => {
//     const mockData = {
//       pending: 5,
//       total: 10,
//       percentDone: 50,
//     }
//     ;(api.get as vi.Mock).mockResolvedValueOnce({ data: mockData })

//     const result = await getScrapStatus()

//     expect(api.get).toHaveBeenCalledWith('/queue')
//     expect(result).toEqual(mockData)
//   })

//   it('should handle API errors', async () => {
//     const mockError = new Error('API error')
//     ;(api.get as vi.Mock).mockRejectedValueOnce(mockError)

//     await expect(getScrapStatus()).rejects.toThrow(mockError)
//   })
// })
