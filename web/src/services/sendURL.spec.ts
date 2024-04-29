import { api } from '@/lib/axios'

import { sendURL } from './sendURL'

vi.mock('@/lib/axios', () => ({
  api: {
    post: vi.fn(),
  },
}))

describe('sendURL', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should return the status code when the request is successful', async () => {
    const url = 'https://example.com'
    const statusReceived = 200

    api.post.mockResolvedValueOnce({ status: statusReceived })

    const result = await sendURL(url)

    expect(api.post).toHaveBeenCalledWith('/domain', { domain: url })
    expect(result).toEqual({ statusReceived })
  })

  it('should return the error message when the request fails', async () => {
    const url = 'example.c'
    const errorMessage = 'Request failed'

    api.post.mockRejectedValueOnce({ message: errorMessage })

    const result = await sendURL(url)

    expect(api.post).toHaveBeenCalledWith('/domain', { domain: url })
    expect(result).toEqual({ statusReceived: 500, errorMessage })
  })
})
