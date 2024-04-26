import { GetTreeUseCase } from './GetTreeUseCase';
import { INodeStore } from "@/application/interfaces/INodeStore";

describe('GetTreeUseCase', () => {
  let storeMock: INodeStore;
  let caseInstance: GetTreeUseCase;

  beforeEach(() => {
    storeMock = {
      saveResult: vi.fn(),
      findByURL: vi.fn(),
      list: vi.fn(),
      count: vi.fn(),
      clear: vi.fn(),
    };
    caseInstance = new GetTreeUseCase(storeMock);
  });

  it('initializes with a node store', () => {
    expect(caseInstance).toBeDefined();
  });

  describe('execute', () => {
    it('returns empty object if store list is empty', async () => {
      storeMock.list.mockResolvedValue([]);
      const result = await caseInstance.execute();
      expect(result).toEqual({});
    });

    it('processes nodes correctly', async () => {
      storeMock.list.mockResolvedValue([{ url: 'root', done: true, title: 'Root', items: [{ href: 'child' }] }]);
      storeMock.findByURL.mockImplementation(url =>
        Promise.resolve(url === 'child' ? { url, done: true, title: 'Child', items: [] } : null)
      );
      const result = await caseInstance.execute();
      expect(result).toEqual({
        done: true,
        url: 'root',
        title: 'Root',
        children: []
      });
    });

    it('handles circular references without infinite loops', async () => {
      storeMock.list.mockResolvedValue([{ url: 'root', done: true, title: 'Root', items: [{ href: 'root' }] }]);
      const result = await caseInstance.execute();
      expect(result).toEqual({
        done: true,
        url: 'root',
        title: 'Root',
        children: []
      });
    });
  });
});
