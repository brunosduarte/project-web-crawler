import { Request, Response } from 'express';
import { ITaskQueue } from '@/application/interfaces/ITaskQueue';

export class QueueController {
  constructor(private queue: ITaskQueue) {}

  public async getQueueStatus(req: Request, res: Response): Promise<void> {
    try {
      const pending = await this.queue.size();
      const total = await this.store.count(); // Assuming store is available
      res.send({ pending, total, percentDone: Math.round(100 * (total - pending) / total) });
    } catch (e) {
      res.status(500).send();
    }
  }

  // Additional queue management methods can be added here
}
