import { IWorkerService } from '@/domain/services/IWorkerService';
import { INodeStore } from '@/application/interfaces/INodeStore';
import { ITaskQueue } from '@/application/interfaces/ITaskQueue';
import { Server } from '@/infrastructure/http/server';
import { WorkerService } from '@/infrastructure/services/WorkerService';
import { NodeStoreInMemory, TaskQueueInMemory } from '@/infrastructure/repositories';

export const queue: ITaskQueue = new TaskQueueInMemory();
export const store: INodeStore = new NodeStoreInMemory();
export const worker: IWorkerService = new WorkerService(queue, store);

queue.onDone(() => worker.end());

const server = new Server({
  store,
  queue,
});

server.start();