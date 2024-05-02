import { extractUrls } from './generateSitemap'

describe('extractUrls', () => {
  it('should extract URLs from a site map node', () => {
    const mockDataNode = {
      url: 'https://example.com',
      done: true,
      title: 'example',
      children: [
        {
          url: 'https://example.com/page1',
          done: true,
          title: 'page1',
        },
        {
          url: 'https://example.com/page2',
          done: true,
          title: 'page2',
          children: [
            {
              url: 'https://example.com/page2/subpage1',
              done: true,
              title: 'subpage1',
            },
            {
              url: 'https://example.com/page2/subpage2',
              done: true,
              title: 'subpage2',
            },
          ],
        },
      ],
    }

    const urls = extractUrls(mockDataNode)

    expect(urls).toEqual(
      new Set([
        'https://example.com',
        'https://example.com/page1',
        'https://example.com/page2',
        'https://example.com/page2/subpage1',
        'https://example.com/page2/subpage2',
      ]),
    )
  })

  it('should return an empty if the node is not done', () => {
    const mockDataNode = {
      url: 'https://example.com',
      done: false,
      title: 'example',
    }

    const urls = extractUrls(mockDataNode)
    expect(urls).toEqual(new Set())
  })
})
