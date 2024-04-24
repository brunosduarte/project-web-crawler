// // tests/GetTreeUseCase.test.ts
// import { GetTreeUseCase } from './GetTreeUseCase';
// import { INodeStore } from "@/application/interfaces/INodeStore";


// vi.mock('@/infrastructure/helpers/guards', () => ({
//   isNotNil: vi.fn().mockImplementation((value) => value != null)
// }));

// let nodeStoreMock: INodeStore;
// let getTreeUseCase: GetTreeUseCase;

// beforeEach(() => {
//   nodeStoreMock = {
//     list: vi.fn()
//   };
//   getTreeUseCase = new GetTreeUseCase(nodeStoreMock);
// });

// describe('GetTreeUseCase', () => {
//   it('initializes with an empty map and consumed set', () => {
//     expect(getTreeUseCase['map']).toBeDefined();
//     expect(getTreeUseCase['map'].size).toBe(0);
//     expect(getTreeUseCase['consumed']).toBeDefined();
//     expect(getTreeUseCase['consumed'].size).toBe(0);
//   });

//   describe('execute method', () => {
//     it('calls store.list and processes result correctly', async () => {
//       const testNodes = [{ id: 'node1', name: 'Node 1', links: [] }];
//       nodeStoreMock.list.mockResolvedValue(testNodes);
      
//       const result = await getTreeUseCase.execute();

//       expect(nodeStoreMock.list).toHaveBeenCalled();
//       expect(result).toBeDefined();
//       expect(result).toMatchObject({ id: 'node1', name: 'Node 1' }); // Adjusted to expected result structure
//     });

//     it('handles empty list response gracefully', async () => {
//       nodeStoreMock.list.mockResolvedValue([]);
      
//       const result = await getTreeUseCase.execute();
      
//       expect(nodeStoreMock.list).toHaveBeenCalled();
//       expect(result).toEqual({});
//     });

//     it('correctly processes multiple nodes with hierarchy', async () => {
//       const testNodes = [
//         { id: 'node1', name: 'Node 1', links: ['node2'] },
//         { id: 'node2', name: 'Node 2', links: [] }
//       ];
//       nodeStoreMock.list.mockResolvedValue(testNodes);

//       const result = await getTreeUseCase.execute();

//       expect(nodeStoreMock.list).toHaveBeenCalled();
//       expect(result).toHaveProperty('id', 'node1');
//       expect(result).toHaveProperty('children');
//       expect(result.children).toHaveLength(1);
//       expect(result.children[0]).toHaveProperty('id', 'node2');
//     });

//     it('manages circular references without infinite loops', async () => {
//       const testNodes = [
//         { id: 'node1', name: 'Node 1', links: ['node2'] },
//         { id: 'node2', name: 'Node 2', links: ['node1'] } // Circular reference
//       ];
//       nodeStoreMock.list.mockResolvedValue(testNodes);

//       const result = await getTreeUseCase.execute();

//       expect(nodeStoreMock.list).toHaveBeenCalled();
//       expect(result).toBeDefined();
//       expect(result.children[0].children).toBeUndefined(); // Expect no infinite loop/circular structure
//     });

//     test('logs an error if the store.list fails', async () => {
//       nodeStoreMock.list.mockRejectedValue(new Error('Failed to fetch nodes'));

//       await expect(getTreeUseCase.execute()).rejects.toThrow('Failed to fetch nodes');
//     });
//   });
// });


// import { IScrapResult } from '@/domain/entities/IScrapResult';
// import { GetTreeUseCase } from './GetTreeUseCase';

// describe('GetTreeUseCase', () => {
//   let mockStore: IScrapResult;
//   let useCase: GetTreeUseCase;

//   beforeEach(() => {
//     mockStore = {
//       list: vi.fn().mockResolvedValue([
//         { url: 'https://example.com', done: true, title: 'Example' },
//         { url: 'https://example.com/page1', done: false, title: 'Page 1' },
//         { url: 'https://example.com/page2', done: true, title: 'Page 2' },
//       ]),
//     };
//     useCase = new GetTreeUseCase(mockStore);
//   });

//   it('should return the root node when executed', async () => {
//     const result = await useCase.execute();

//     expect(result).toEqual({
//       done: true,
//       url: 'https://example.com',
//       title: 'Example',
//       children: [
//         {
//           done: false,
//           url: 'https://example.com/page1',
//           title: 'Page 1',
//           children: undefined,
//         },
//         {
//           done: true,
//           url: 'https://example.com/page2',
//           title: 'Page 2',
//           children: undefined,
//         },
//       ],
//     });
//   });

//   it('should not include children of consumed nodes', async () => {
//     const result = await useCase.execute();

//     expect(result.children).toHaveLength(2);
//     expect(result.children).not.toContain(undefined);
//   });

//   it('should not include children that are parents of the current node', async () => {
//     const result = await useCase.execute();

//     expect(result.children).toHaveLength(2);
//     expect(result.children).not.toContain(undefined);
//     expect(result.children).not.toContain(
//       expect.objectContaining({ url: 'https://example.com' })
//     );
//   });
// });