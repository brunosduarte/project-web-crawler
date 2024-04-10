import { INodeStore } from '@/application/interfaces/INodeStore';
import { InMemoryNodeStore } from '@/infrastructure/store/InMemoryNodeStore';
import { InMemoryTaskQueue } from '@/infrastructure/queue/InMemoryTaskQueue';
import { WorkerService } from '@/infrastructure/services/WorkerService'; 
import { Server } from '@/infrastructure/http/server';

export const queue = new InMemoryTaskQueue();
export const store: INodeStore = new InMemoryNodeStore();
export const worker = new WorkerService(queue, store);

queue.onDone(() => worker.end());

const server = new Server({
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  store,
  queue,
});

server.start()
  .then(() => {
    console.log(`Listening on port ${server.getPort()}`)
  })
  .catch((err: { message: unknown; }) => {
    console.error("Failed to start server: ", err?.message);
    process.exit(1);
  });


