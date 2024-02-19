import { INodeStore } from '../store/INodeStore';
import { MemoryNodeStore } from '../store/MemoryNodeStore';
import { Scrapper } from '../Scrapper';
import { MemoryTaskQueue } from '../queue/MemoryTaskQueue';
import { ITaskQueue } from '../queue/ITaskQueue';
import { Worker } from '../Worker'; 
import { Server } from '../Server';

describe('Server', () => {
  let server: Server;
  let store: INodeStore;
  let queue: ITaskQueue;
  let worker: Worker;

  beforeEach(() => {
    store = new MemoryNodeStore();
    queue = new MemoryTaskQueue();
    worker = new Worker(queue, store);
    server = new Server({
      port: 3000,
      store,
      queue,
    });
  });

  afterEach(() => {
    server.stop();
  });

  it('should start the server', async () => {
    await server.start();
    expect(server.isRunning()).toBe(true);
  });

  it('should stop the server', async () => {
    await server.start();
    server.stop();
    expect(server.isRunning()).toBe(false);
  });

  it('should add a task to the queue', () => {
    const task = { url: 'https://www.enki.com/' };
    queue.add(task);
    expect(queue.size()).toBe(1);
    expect(queue.peek()).toEqual(task);
  });

  // Add more tests for your code here...

});



// import { INodeStore } from '../store/INodeStore';
// import { MemoryNodeStore } from '../store/MemoryNodeStore';
// import { Scrapper } from '../Scrapper';
// import { MemoryTaskQueue } from '../queue/MemoryTaskQueue';
// import { ITaskQueue } from '../queue/ITaskQueue';
// import { Worker } from '../Worker'; 
// import { Server } from '../Server';

// describe('Server', () => {
//   let store: INodeStore;
//   let queue: ITaskQueue;
//   let worker: Worker;
//   let server: Server;

//   beforeEach(() => {
//     store = new MemoryNodeStore();
//     queue = new MemoryTaskQueue();
//     worker = new Worker(queue, store);
//     server = new Server({
//       port: 3000,
//       store,
//       queue,
//     });
//   });

//   afterEach(() => {
//     server.stop();
//   });

//   it('should start the server', async () => {
//     await server.start();
//     expect(server.isRunning()).toBe(true);
//   });

//   it('should stop the server', async () => {
//     await server.start();
//     server.stop();
//     expect(server.isRunning()).toBe(false);
//   });

//   it('should add a task to the queue', () => {
//     const task = { url: 'https://www.enki.com/' };
//     queue.add(task);
//     expect(queue.size()).toBe(1);
//     expect(queue.peek()).toEqual(task);
//   });

//   // Add more tests for your code here...

// });