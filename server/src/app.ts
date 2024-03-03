// import { INodeStore } from './store/INodeStore';
import { InMemoryNodeStore } from './store/InMemoryNodeStore';
import { InMemoryTaskQueue } from './queue/InMemoryTaskQueue';
import { ITaskQueue } from './queue/ITaskQueue';
import { Worker } from '@/repositories/Worker'; 
import { Server } from './server';
import { INodeStore } from './store/INodeStore';

const queue = new InMemoryTaskQueue();
const store: INodeStore = new InMemoryNodeStore();

const worker = new Worker(queue, store);
queue.onDone(() => worker.end());
export const server = new Server({
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  store,
  queue,
});

server.start()
  .then(() => {
    console.log(`Listening on port ${server.getPort()}`)
  })
  .catch((err: { message: any; }) => {
    console.error("Failed to start server:", err?.message);
    process.exit(1);
  });


queue.add({ url: 'https://www.microsoft.com' });