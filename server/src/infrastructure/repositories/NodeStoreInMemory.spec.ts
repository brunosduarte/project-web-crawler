import { NodeStoreInMemory } from '@/infrastructure/repositories';

describe('InMemoryNodeStore', () => {
  let store: NodeStoreInMemory;

  beforeEach(() => {
    store = new NodeStoreInMemory();
  });

  it('should save a result', async () => {
    const data = { url: 'http://example.com', result: 'example' };
    await store.saveResult(data);
    const result = await store.findByURL(data.url);
    expect(result).toEqual(data);
  });

  it('should return undefined for non-existing URL', async () => {
    const result = await store.findByURL('https://www.nonexistent.com');
    expect(result).toBeUndefined();
  });

  it('should return a list of results', async () => {
    const data1 = { url: 'http://example1.com', result: 'example1' };
    const data2 = { url: 'http://example2.com', result: 'example2' };
    await store.saveResult(data1);
    await store.saveResult(data2);
    const results = await store.list();
    expect(results).toEqual([data1, data2]);
  });

  it('should return the count of results', async () => {
    const data1 = { url: 'http://example1.com', result: 'example1' };
    const data2 = { url: 'http://example2.com', result: 'example2' };
    await store.saveResult(data1);
    await store.saveResult(data2);
    const count = await store.count();
    expect(count).toBe(2);
  });
});