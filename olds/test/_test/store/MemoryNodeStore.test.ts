import { MemoryNodeStore } from '../../store/MemoryNodeStore';
import { IScrapResult } from '../../entities/IScrapResult';

describe('MemoryNodeStore', () => {
  let memoryNodeStore: MemoryNodeStore;

  beforeEach(() => {
    memoryNodeStore = new MemoryNodeStore();
  });

  afterEach(() => {
    memoryNodeStore = null;
  });

  it('should save a node', async () => {
    const node: IScrapResult = { url: 'https://example.com', data: 'Some data' };
    await memoryNodeStore.saveNode(node);
    const savedNode = await memoryNodeStore.findNodeByURL(node.url);
    expect(savedNode).toEqual(node);
  });

  it('should find a node by URL', async () => {
    const node: IScrapResult = { url: 'https://example.com', data: 'Some data' };
    await memoryNodeStore.saveNode(node);
    const foundNode = await memoryNodeStore.findNodeByURL(node.url);
    expect(foundNode).toEqual(node);
  });

  it('should return undefined when finding a non-existent node', async () => {
    const foundNode = await memoryNodeStore.findNodeByURL('https://nonexistent.com');
    expect(foundNode).toBeUndefined();
  });

  it('should list all nodes', async () => {
    const node1: IScrapResult = { url: 'https://example.com', data: 'Some data' };
    const node2: IScrapResult = { url: 'https://example.org', data: 'Some other data' };
    await memoryNodeStore.saveNode(node1);
    await memoryNodeStore.saveNode(node2);
    const nodeList = await memoryNodeStore.listNodes();
    expect(nodeList).toEqual([node1, node2]);
  });

  it('should return the count of nodes', async () => {
    const node1: IScrapResult = { url: 'https://example.com', data: 'Some data' };
    const node2: IScrapResult = { url: 'https://example.org', data: 'Some other data' };
    await memoryNodeStore.saveNode(node1);
    await memoryNodeStore.saveNode(node2);
    const nodeCount = await memoryNodeStore.countNodes();
    expect(nodeCount).toBe(2);
  });
});
