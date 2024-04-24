// import { GetTreeUseCase } from '@/application/use-cases/GetTreeUseCase';
// import { INodeStore } from '@/application/interfaces/INodeStore';
// import { IScrapResult } from '@/domain/entities/IScrapResult';

// describe('GetTreeUseCase', () => {
//   let getTreeUseCase: GetTreeUseCase;
//   let storeMock: INodeStore;

//   beforeEach(() => {
//     storeMock = {
//       list: vi.fn(),
//     };
//     getTreeUseCase = new GetTreeUseCase(storeMock);
//   });

//   it('should return an empty object when the store list is empty', async () => {
//     storeMock.list.mockResolvedValue([]);
//     const result = await getTreeUseCase.execute();
//     expect(result).toEqual({});
//   });

//   it('should return the item as it is when the store list has one item that is not done', async () => {
//     const item: IScrapResult = { url: 'https://www.test.com', done: false };
//     storeMock.list.mockResolvedValue([item]);
//     const result = await getTreeUseCase.execute();
//     expect(result).toEqual(item);
//   });

//   it('should return the item with children as undefined when the store list has one item that is done', async () => {
//     const item: IScrapResult = { url: 'https://www.test.com', done: true, items: [] };
//     storeMock.list.mockResolvedValue([item]);
//     const result = await getTreeUseCase.execute();
//     expect(result).toEqual({ ...item, children: undefined });
//   });

//   it('should return the root of the tree with children populated correctly when the store list has multiple items', async () => {
//     const item1: IScrapResult = { url: 'https://www.test.com', done: true, items: [{ href: 'https://www.test.com/1' }] };
//     const item2: IScrapResult = { url: 'https://www.test.com/1', done: true, items: [] };
//     storeMock.list.mockResolvedValue([item1, item2]);
//     const result = await getTreeUseCase.execute();
//     expect(result).toEqual({ ...item1, children: [{ ...item2, children: undefined }] });
//   });
// });