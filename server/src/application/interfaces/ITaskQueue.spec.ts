import { ITaskQueue, TaskWorker } from '@/application/interfaces/ITaskQueue';
import { ITask } from '@/domain/valueObjects/ITask';

describe('ITaskQueue', () => {
  let taskQueue: ITaskQueue;
  let workerMock: TaskWorker;
  let task: ITask;

  beforeEach(() => {
    workerMock = vi.fn();
    taskQueue = {
      add: vi.fn(),
      size: vi.fn(),
      setWorker: vi.fn(),
      onDone: vi.fn(),
      clear: vi.fn()
    };
    task = { url: 'https://www.test.com' };
  });

  it('should add a task to the queue', async () => {
    await taskQueue.add(task);
    expect(taskQueue.add).toHaveBeenCalledWith(task);
  });

  it('should set a worker', () => {
    taskQueue.setWorker(workerMock);
    expect(taskQueue.setWorker).toHaveBeenCalledWith(workerMock);
  });

  it('should call the onDone callback', () => {
    const callback = vi.fn();
    taskQueue.onDone(callback);
    expect(taskQueue.onDone).toHaveBeenCalledWith(callback);
  });

  it('should return the size of the queue', async () => {
    await taskQueue.size();
    expect(taskQueue.size).toHaveBeenCalled();
  });

  it('should clear the queue', () => {
    taskQueue.clear();
    expect(taskQueue.clear).toHaveBeenCalled();
  });
});