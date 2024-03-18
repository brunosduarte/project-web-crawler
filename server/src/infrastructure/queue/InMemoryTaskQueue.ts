import PQueue from 'p-queue';
import { ITaskQueue, TaskWorker } from '@/application/interfaces/ITaskQueue';
import { ITask } from '@/domain/valueObjects/ITask';

export class InMemoryTaskQueue implements ITaskQueue {
  private worker: TaskWorker | undefined;
  private queue = new PQueue({
    concurrency: 10,
  });

  constructor(){
    this.queue.clear();
  }

  async add(task: ITask): Promise<void> {
    const worker = this.worker;
    if(!worker) {
      throw new Error ('Missing worker');
    }
    this.queue.add(() => worker(task));
  }

  setWorker(worker: TaskWorker): void {
    this.worker = worker;
  }

  onDone(callback: () => void) {
    this.queue.on('idle', callback);
  }

  async size(): Promise<number> {
    return this.queue.size;
  }
}