// import { WorkerService } from './WorkerService';
// import { ITaskQueue } from '@/application/interfaces/ITaskQueue';
// import { INodeStore } from '@/application/interfaces/INodeStore';
// import { ITask } from '@/domain/valueObjects/ITask';
// import { ScrapperService } from './ScrapperService';

// describe('WorkerService', () => {
//   let workerService: WorkerService | null;
//   let mockQueue: ITaskQueue | null;
//   let mockStore: INodeStore | null;
//   let mockScrapper: ScrapperService | null;

//   beforeEach(() => {
//     mockQueue = {
//       setWorker: vi.fn(),
//       add: vi.fn(),
//       size: vi.fn(),
//     };
//     mockStore = {
//       saveResult: vi.fn(),
//       findByURL: vi.fn(),
//       list: vi.fn(),
//       count: vi.fn(),
//     };
//     mockScrapper = {
//       scrap: vi.fn(),
//       end: vi.fn(),
//       getBrowser: vi.fn(),
//     };
//     workerService = new WorkerService(mockQueue, mockStore);
//   });

//   afterEach(() => {
//     workerService = null;
//     mockQueue = null;
//     mockStore = null;
//     mockScrapper = null;
//   });

//   describe('worker', () => {
//     it('should process a task and save the result if not already done', async () => {
//       const task: ITask = { url: 'https://example.com' };
//       const mockResult = { done: false, url: 'https://example.com', items: [] };
//       const mockFilteredLinks = ['https://example.com/link1', 'https://example.com/link2'];

//       mockStore.findByURL.mockResolvedValue(null);
//       mockScrapper.scrap.mockResolvedValue(mockResult);

//       await workerService['worker'](task);

//       expect(mockStore.findByURL).toHaveBeenCalledWith(task.url);
//       expect(mockScrapper.scrap).toHaveBeenCalledWith(task.url);
//       expect(mockStore.saveResult).toHaveBeenCalledWith(mockResult);

//       expect(mockStore.findByURL).toHaveBeenCalledWith(mockResult.url);
//       expect(mockQueue.add).toHaveBeenCalledTimes(mockFilteredLinks.length);
//       mockFilteredLinks.forEach((link) => {
//         expect(mockQueue.add).toHaveBeenCalledWith({ url: link });
//       });
//     });

//     it('should not process a task if already done', async () => {
//       const task: ITask = { url: 'https://example.com' };
//       const mockResult = { done: true, url: 'https://example.com', items: [] };

//       mockStore.findByURL.mockResolvedValue(mockResult);

//       await workerService['worker'](task);

//       expect(mockStore.findByURL).toHaveBeenCalledWith(task.url);
//       expect(mockScrapper.scrap).not.toHaveBeenCalled();
//       expect(mockStore.saveResult).not.toHaveBeenCalled();
//       expect(mockQueue.add).not.toHaveBeenCalled();
//     });

//     it('should not process a task if scrap result is null', async () => {
//       const task: ITask = { url: 'https://example.com' };

//       mockStore.findByURL.mockResolvedValue(null);
//       mockScrapper.scrap.mockResolvedValue(null);

//       await workerService['worker'](task);

//       expect(mockStore.findByURL).toHaveBeenCalledWith(task.url);
//       expect(mockScrapper.scrap).toHaveBeenCalledWith(task.url);
//       expect(mockStore.saveResult).not.toHaveBeenCalled();
//       expect(mockQueue.add).not.toHaveBeenCalled();
//     });
//   });

//   describe('addToQueue', () => {
//     it('should add a task to the queue if the URL is valid and not already processed', async () => {
//       const url = 'https://example.com';

//       mockStore.findByURL.mockResolvedValue(null);

//       await workerService.addToQueue(url);

//       expect(mockStore.findByURL).toHaveBeenCalledWith(url);
//       expect(mockStore.saveResult).toHaveBeenCalledWith({ done: false, url });
//       expect(mockQueue.add).toHaveBeenCalledWith({ url });
//     });

//     it('should not add a task to the queue if the URL is invalid', async () => {
//       const url = 'invalid-url';

//       await workerService.addToQueue(url);

//       expect(mockStore.findByURL).not.toHaveBeenCalled();
//       expect(mockStore.saveResult).not.toHaveBeenCalled();
//       expect(mockQueue.add).not.toHaveBeenCalled();
//     });

//     it('should not add a task to the queue if the URL is already processed', async () => {
//       const url = 'https://example.com';
//       const mockResult = { done: true, url };

//       mockStore.findByURL.mockResolvedValue(mockResult);

//       await workerService.addToQueue(url);

//       expect(mockStore.findByURL).toHaveBeenCalledWith(url);
//       expect(mockStore.saveResult).not.toHaveBeenCalled();
//       expect(mockQueue.add).not.toHaveBeenCalled();
//     });
//   });

//   describe('end', () => {
//     it('should call the end method of the scrapper service', () => {
//       workerService.end();

//       expect(mockScrapper.end).toHaveBeenCalled();
//     });
//   });
// });