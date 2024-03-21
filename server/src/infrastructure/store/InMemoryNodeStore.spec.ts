import { InMemoryNodeStore } from '@/infrastructure/store/InMemoryNodeStore';

describe('InMemoryNodeStore', () => {
  let store: InMemoryNodeStore;

  beforeEach(() => {
    store = new InMemoryNodeStore();
  });

  it('should save a result', async () => {
    const data = { url: 'https://www.example.com', result: 'example' };
    await store.saveResult(data);
    const result = await store.findByURL(data.url);
    expect(result).toEqual(data);
  });

  it('should return undefined for non-existing URL', async () => {
    const result = await store.findByURL('https://www.nonexistent.com');
    expect(result).toBeUndefined();
  });

  it('should return a list of results', async () => {
    const data1 = { url: 'https://www.example1.com', result: 'example1' };
    const data2 = { url: 'https://www.example2.com', result: 'example2' };
    await store.saveResult(data1);
    await store.saveResult(data2);
    const results = await store.list();
    expect(results).toEqual([data1, data2]);
  });

  it('should return the count of results', async () => {
    const data1 = { url: 'https://www.example1.com', result: 'example1' };
    const data2 = { url: 'https://www.example2.com', result: 'example2' };
    await store.saveResult(data1);
    await store.saveResult(data2);
    const count = await store.count();
    expect(count).toBe(2);
  });
});