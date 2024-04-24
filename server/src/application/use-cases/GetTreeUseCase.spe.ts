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