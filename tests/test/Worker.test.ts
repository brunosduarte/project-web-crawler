// import { describe, it, expect, jest, beforeEach } from '@jest/globals'
// import { Worker } from '../Worker';
// import { INodeStore } from '../store/INodeStore';
// import { ITaskQueue } from '../queue/ITaskQueue';
// import { ITask} from '../entities/ITask';

// jest.mock('../queue/ITaskQueue');
// jest.mock('../store/INodeStore');

// describe('Worker', () => {
//   let mockQueue: jest.Mocked<ITaskQueue>;
//   let mockStore: jest.Mocked<INodeStore>;
//   let worker: Worker;

//   beforeEach(() => {
//     // Initialize mocks before each test
//     mockQueue = new (jest.mocked(ITaskQueue, true))();
//     mockStore = new (jest.mocked(INodeStore, true))();
//     worker = new Worker(mockQueue, mockStore);
//   });

// // describe('Worker', () => {
// //   let worker: Worker;
// //   let mockQueue: jest.Mocked<ITaskQueue>;
// //   let mockStore: jest.Mocked<INodeStore>;

// //   beforeEach(() => {
// //     mockQueue = {
// //       setWorker: jest.fn(),
// //       add: jest.fn(),
// //     };
// //     mockStore = {
// //       findNodeByURL: jest.fn(),
// //       saveNode: jest.fn(),
// //     };
// //     worker = new Worker(mockQueue, mockStore);
// //   });

//   it('should process a task', async () => {
//     const task: ITask = { url: 'https://www.enki.com/test' };
//     mockStore.findNodeByURL.mockResolvedValueOnce(null);
//     await worker['worker'](task);
//     expect(mockStore.findNodeByURL).toHaveBeenCalledWith(task.url);
//     expect(mockStore.saveNode).toHaveBeenCalled();
//   });

//   it('should not process a task if node already exists', async () => {
//     const task: ITask = { url: 'https://www.enki.com/test' };
//     mockStore.findNodeByURL.mockResolvedValueOnce({}); // Assuming a node is an object
//     await worker['worker'](task);
//     expect(mockStore.findNodeByURL).toHaveBeenCalledWith(task.url);
//     expect(mockStore.saveNode).not.toHaveBeenCalled();
//   });

//   it('should add a URL to the queue', async () => {
//     const url = 'https://www.enki.com/test';
//     mockStore.findNodeByURL.mockResolvedValueOnce(null);
//     await worker['addToQueue'](url);
//     expect(mockQueue.add).toHaveBeenCalledWith({ url });
//   });

//   it('should not add a URL to the queue if it already exists in the store', async () => {
//     const url = 'https://www.enki.com/test';
//     mockStore.findNodeByURL.mockResolvedValueOnce({});
//     await worker['addToQueue'](url);
//     expect(mockQueue.add).not.toHaveBeenCalled();
//   });

//   it('should not add a URL to the queue if it does not start with the correct domain', async () => {
//     const url = 'https://www.test.com';
//     await worker['addToQueue'](url);
//     expect(mockQueue.add).not.toHaveBeenCalled();
//   });
// });


// // Mocking dependencies
// // jest.mock('../path/to/queue/ITaskQueue');
// // jest.mock('../path/to/store/INodeStore');

// // describe('Worker', () => {
// //   let mockQueue: jest.Mocked<ITaskQueue>;
// //   let mockStore: jest.Mocked<INodeStore>;
// //   let worker: Worker;

// //   beforeEach(() => {
// //     // Initialize mocks before each test
// //     mockQueue = new (jest.mocked(ITaskQueue, true))();
// //     mockStore = new (jest.mocked(INodeStore, true))();
// //     worker = new Worker(mockQueue, mockStore);
// //   });

// //   it('should correctly initialize with dependencies', () => {
// //     // Verify that the Worker is correctly initialized with the mock dependencies
// //     expect(worker).toBeDefined();
// //     expect(mockQueue.setWorker).toHaveBeenCalledWith(expect.any(Function));
// //   });

// //   it('should process tasks correctly', async () => {
// //     // Assuming Worker has a method 'processTask' that takes a task and processes it
// //     const mockTask = { id: 'task1', data: 'data' }; // Example task, adjust according to the actual task structure
// //     await worker.processTask(mockTask);

// //     // Verify interactions with dependencies, e.g., task was added to the queue, data was stored
// //     expect(mockQueue.addTask).toHaveBeenCalledWith(mockTask);
// //     expect(mockStore.saveData).toHaveBeenCalledWith(mockTask.data);
// //   });

// //   it('should handle errors during task processing', async () => {
// //     // Simulate an error during task processing
// //     const mockTask = { id: 'task2', data: 'data' };
// //     mockQueue.addTask.mockRejectedValue(new Error('Task processing failed'));

// //     await expect(worker.processTask(mockTask)).rejects.toThrow('Task processing failed');

// //     // Optionally, verify how the Worker class handles the error, e.g., logging, retrying, etc.
// //   });

// //   // Add more test cases as needed to cover all functionalities and edge cases
// // });
