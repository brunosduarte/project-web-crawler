import { AxiosError, AxiosResponse } from 'axios'

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
    const mockResponse: AxiosResponse = {
      status: statusReceived,
      data: {},
      headers: {},
      config: {},
    }

    api.post.mockResolvedValueOnce(mockResponse)

    const result = await sendURL(url)

    expect(api.post).toHaveBeenCalledWith('/domain', { domain: url })
    expect(result).toEqual({ statusReceived })
  })

  it('should throw an error when the request fails', async () => {
    const url = 'https://example.com'
    const errorMessage = 'Request failed'
    const mockError: AxiosError = {
      message: errorMessage,
      name: '',
      config: {},
      isAxiosError: true,
    }

    api.post.mockRejectedValueOnce(mockError)

    await expect(sendURL(url)).rejects.toThrow(errorMessage)
    expect(api.post).toHaveBeenCalledWith('/domain', { domain: url })
  })
})