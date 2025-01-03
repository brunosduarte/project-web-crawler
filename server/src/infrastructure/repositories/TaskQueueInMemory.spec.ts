import { ITask } from '@/domain/valueObjects/ITask';
import { TaskQueueInMemory } from '@/infrastructure/repositories/TaskQueueInMemory';

describe('TaskQueueInMemory', () => {
  let taskQueue: TaskQueueInMemory;
  let workerMock: vi.Mock;

  beforeEach(() => {
    taskQueue = new TaskQueueInMemory();
    workerMock = vi.fn();
    taskQueue.setWorker(workerMock);
  });

  afterEach(() => {
    taskQueue = null;
    workerMock = null;
  });

  it('should add a task to the queue', async () => {
    const task: ITask = { url: 'https://example.com' };
    await taskQueue.add(task);
    expect(workerMock).toHaveBeenCalledWith(task);
  });

  it('should throw an error when adding a task without a worker', async () => {
    taskQueue.setWorker(undefined);
    const task: ITask = { url: 'https://example.com' };
    await expect(taskQueue.add(task)).rejects.toThrow('Missing worker');
  });

  it('should call the onDone callback when the queue is idle', () => {
    const callback = vi.fn();
    taskQueue.onDone(callback);
    taskQueue.queue.emit('idle');
    expect(callback).toHaveBeenCalled();
  });

  it('should return the size of the queue', async () => {
    const size = await taskQueue.size();
    expect(size).toBe(0);
  });

  it('should clear the queue', () => {
    taskQueue.clear();
    expect(taskQueue.queue.size).toBe(0);
  });
});