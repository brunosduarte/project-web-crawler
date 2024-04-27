import { parseData } from './parseData'

describe('parseData', () => {
  it('should return a root node with empty children when data is invalid', () => {
    const invalidData = null
    const expectedNode = { name: 'root', children: [] }

    const result = parseData(invalidData)

    expect(result).toEqual(expectedNode)
  })

  it('should return a root node with provided title when data has no URL', () => {
    const data = { title: 'Sample Title', children: [] }
    const expectedNode = { name: 'Sample Title', children: [] }

    const result = parseData(data)

    expect(result).toEqual(expectedNode)
  })

  it('should return a root node with provided title and children when data is valid', () => {
    const mockData = {
      title: 'Example',
      url: 'https://example.com',
      done: 'true',
      children: [
        {
          title: 'Child 1',
          url: 'https://example.com/child1',
          done: 'true',
          children: [],
        },
        {
          title: 'Child 2',
          url: 'https://example.com/child2',
          done: 'true',
          children: [],
        },
      ],
    }
    const expectedNode = {
      name: 'Example',
      children: [
        {
          title: 'Child 1',
          name: 'child1',
          children: [],
          url: 'https://example.com/child1',
          done: 'true',
        },
        {
          title: 'Child 2',
          name: 'child2',
          children: [],
          url: 'https://example.com/child2',
          done: 'true',
        },
      ],
    }

    const result = parseData(mockData)
    expect(result).toEqual(expectedNode)
  })
})
