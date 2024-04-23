import { Server } from '@/infrastructure/http/server';
import { NodeStoreInMemory, TaskQueueInMemory } from '@/infrastructure/repositories';
import { INodeStore } from '@/application/interfaces/INodeStore';
import { WorkerService } from './services/WorkerService';
import { config } from '@/application/config/config';

export const queue = new TaskQueueInMemory();
export const store: INodeStore = new NodeStoreInMemory();
export const worker = new WorkerService(queue, store);

queue.onDone(() => worker.end());

const server = new Server({
  port: config.port,
  store,
  queue,
});

server.start()
  .catch((err: { message: unknown; }) => {
    console.error("Failed to start server: ", err?.message);
    process.exit(1);
  });