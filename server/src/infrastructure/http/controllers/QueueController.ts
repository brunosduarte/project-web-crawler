import { Request, Response } from 'express';
import { INodeStore } from '@/application/interfaces/INodeStore';
import { ITaskQueue } from '@/application/interfaces/ITaskQueue';

export class QueueController {

  constructor(private queue: ITaskQueue, private store: INodeStore) {}

  public async getQueueStatus(req: Request, res: Response): Promise<void> {
    try {
      const pending = await this.queue.size();
      const total = await this.store.count();
      res.send({ pending, total, percentDone: Math.round(100 * (total - pending) / total) });
    } catch (e) {
      res.status(500).send();
    }
  }
}
