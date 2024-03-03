import { INodeStore } from '@/interfaces/stores/INodeStore';
import { ITaskQueue } from '@/interfaces/queues/ITaskQueue';

export class GetQueueStatus {
  constructor(private queue: ITaskQueue, private store: INodeStore) {}

  async execute() {
    const pending = await this.queue.size();
    const total = await this.store.count();

    return {
      pending,
      total,
      percentDone: Math.round(100 * (total - pending) / total)
    };
  }
}
