import { Server } from '@/infrastructure/http/server';
import { NodeStoreInMemory, TaskQueueInMemory } from '@/infrastructure/repositories';
import { INodeStore } from '@/application/interfaces/INodeStore';
import { WorkerService } from './services/WorkerService';
import { ITaskQueue } from '@/application/interfaces/ITaskQueue';
import { IWorkerService } from '@/domain/services/IWorkerService';

export const queue: ITaskQueue = new TaskQueueInMemory();
export const store: INodeStore = new NodeStoreInMemory();
export const worker: IWorkerService = new WorkerService(queue, store);

queue.onDone(() => worker.end());

const server = new Server({
  store,
  queue,
});

server.start();