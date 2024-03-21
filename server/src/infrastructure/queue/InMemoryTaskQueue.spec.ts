import { TaskWorker } from '@/application/interfaces/ITaskQueue';
import { InMemoryTaskQueue } from './InMemoryTaskQueue';
import { ITask } from '@/domain/valueObjects/ITask';

describe('InMemoryTaskQueue', () => {
  let taskQueue: InMemoryTaskQueue;
  let workerMock: TaskWorker;

  beforeEach(() => {
    taskQueue = new InMemoryTaskQueue();
    workerMock = vi.fn();
    taskQueue.setWorker(workerMock);
  });

  afterEach(() => {
    taskQueue = null;
    workerMock = null;
  });

  it('should add a task to the queue', async () => {
    const task: ITask = { url: 'https://www.test.com' };
    await taskQueue.add(task);
    expect(workerMock).toHaveBeenCalledWith(task);
  });

  it('should throw an error when adding a task without a worker', async () => {
    taskQueue.setWorker(undefined);
    const task: ITask = { url: 'https://www.test.com' };
    await expect(taskQueue.add(task)).rejects.toThrow('Missing worker');
  });

  it('should call the onDone callback when the queue is idle', () => {
    const callback = vi.fn();
    taskQueue.onDone(callback);
    taskQueue.size = vi.fn(() => Promise.resolve(0));
    taskQueue.queue.emit('idle');
    expect(callback).toHaveBeenCalled();
  });

  it('should return the size of the queue', async () => {
    const size = await taskQueue.size();
    expect(size).toBe(0);
  });
});