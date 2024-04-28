import { api } from '@/lib/axios'

import { getTree } from './getTree'

vi.mock('@/lib/axios', () => ({
  api: {
    get: vi.fn(),
  },
}))

describe('getTree', () => {
  it('should call the API endpoint and return the data', async () => {
    const mockData = {
      done: true,
      url: 'https://example.com',
      title: 'Example',
      children: [],
    }

    ;(api.get as vi.Mock).mockResolvedValueOnce({ data: mockData })

    const result = await getTree()

    expect(api.get).toHaveBeenCalledWith('/tree')
    expect(result).toEqual(mockData)
  })
})
