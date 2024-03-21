import { render } from '@testing-library/react'
import { Tree } from './Tree'

describe('Tree component', () => {
  const mockDataTree = {
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

  it('should render without errors', () => {
    render(<Tree dataTree={mockDataTree} />)
    // add your assertions here
  })

})