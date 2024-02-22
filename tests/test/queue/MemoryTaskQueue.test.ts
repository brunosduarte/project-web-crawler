// import { MemoryTaskQueue } from '../../queue/MemoryTaskQueue';
// import { ITask } from '../../entities/ITask';

// describe('MemoryTaskQueue', () => {
//   let taskQueue: MemoryTaskQueue;

//   beforeEach(() => {
//     taskQueue = new MemoryTaskQueue();
//   });

//   it('should add a task to the queue', async () => {
//     const task: ITask = { id: 1, name: 'Task 1' };
//     await taskQueue.add(task);
//     const queueSize = await taskQueue.size();
//     expect(queueSize).toBe(1);
//   });

//   it('should set a worker for the queue', () => {
//     const worker = jest.fn();
//     taskQueue.setWorker(worker);
//     expect(taskQueue['worker']).toBe(worker);
//   });

//   it('should return the size of the queue', async () => {
//     const task1: ITask = { id: 1, name: 'Task 1' };
//     const task2: ITask = { id: 2, name: 'Task 2' };
//     await taskQueue.add(task1);
//     await taskQueue.add(task2);
//     const queueSize = await taskQueue.size();
//     expect(queueSize).toBe(2);
//   });
// });



// // import { MemoryTaskQueue } from '../../queue/MemoryTaskQueue';
// // import { ITask } from '../../entities/ITask';

// // describe('MemoryTaskQueue', () => {
// //   let taskQueue: MemoryTaskQueue;

// //   beforeEach(() => {
// //     taskQueue = new MemoryTaskQueue();
// //   });

// //   it('should add a task to the queue', async () => {
// //     const task: ITask = { id: '1', name: 'Task 1' };
// //     await taskQueue.add(task);
// //     const queueSize = await taskQueue.size();
// //     expect(queueSize).toBe(1);
// //   });

// //   it('should set a worker for the queue', () => {
// //     const worker = jest.fn();
// //     taskQueue.setWorker(worker);
// //     expect(taskQueue['worker']).toBe(worker);
// //   });

// //   it('should return the size of the queue', async () => {
// //     const task1: ITask = { id: '1', name: 'Task 1' };
// //     const task2: ITask = { id: '2', name: 'Task 2' };
// //     await taskQueue.add(task1);
// //     await taskQueue.add(task2);
// //     const queueSize = await taskQueue.size();
// //     expect(queueSize).toBe(2);
// //   });
// // });