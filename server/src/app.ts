import { INodeStore } from './store/INodeStore';
import { MemoryNodeStore } from './store/MemoryNodeStore';
import { Scrapper } from './Scrapper';
import { MemoryTaskQueue } from './queue/MemoryTaskQueue';
import { ITaskQueue } from './queue/ITaskQueue';
import { Worker } from './Worker'; 
import { Server } from './Server';

const store: INodeStore = new MemoryNodeStore();
const queue: ITaskQueue = new MemoryTaskQueue();

const worker = new Worker(queue, store);
const server = new Server({
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  store,
  queue,
});

server.start()
  .then(() => {
    console.log(`Listening on port ${server.getPort()}`)
  })
  .catch(err => {
    console.error("Failed to start server:", err?.message);
    process.exit(1);
  });


queue.add({ url: 'https://www.enki.com/' });