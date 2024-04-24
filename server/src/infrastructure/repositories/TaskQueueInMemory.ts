import PQueue from 'p-queue';
import { ITaskQueue, TaskWorker } from '@/application/interfaces/ITaskQueue';
import { ITask } from '@/domain/valueObjects/ITask';

export class TaskQueueInMemory implements ITaskQueue {
  private worker: TaskWorker | undefined;
  public queue = new PQueue({
    concurrency: 10,
  });

  constructor(){
    this.clear()
  }
  
  async add(task: ITask): Promise<void> {
    const worker = this.worker;
    if(!worker) {
      throw new Error ('Missing worker');
    }
    this.queue.add(() => worker(task));
  }

  async size(): Promise<number> {
    return this.queue.size;
  }

  setWorker(worker: TaskWorker): void {
    this.worker = worker;
  }

  onDone(callback: () => void): void {
    this.queue.on('idle', callback);
  }

  clear(): void {
    this.queue.clear();
  }
}