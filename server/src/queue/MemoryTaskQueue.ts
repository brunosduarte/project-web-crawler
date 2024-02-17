import PQueue from 'p-queue';
import { ITaskQueue, TaskWorker } from './ITaskQueue';
import { ITask } from '../entities/ITask';

export class MemoryTaskQueue implements ITaskQueue {
  private worker: TaskWorker | undefined;
  private queue = new PQueue({
    concurrency: 10,
  });

  constructor(){}

  async add(task: ITask): Promise<void> {
    const worker = this.worker;
    if(!worker) {
      throw new Error ('missing worker');
    }
    this.queue.add(() => worker(task));
  }

  setWorker(worker: TaskWorker): void {
    this.worker = worker;
  }

  async size(): Promise<number> {
    return this.queue.size;
  }
}