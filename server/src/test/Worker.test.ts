import { describe, it, expect, jest } from '@jest/globals'
import { Worker } from '../Worker';
import { INodeStore } from '../store/INodeStore';
import { ITaskQueue } from '../queue/ITaskQueue';
import { ITask} from '../entities/ITask';

describe('Worker', () => {
  let worker: Worker;
  let mockQueue: jest.Mocked<ITaskQueue>;
  let mockStore: jest.Mocked<INodeStore>;

  beforeEach(() => {
    mockQueue = {
      setWorker: jest.fn(),
      add: jest.fn(),
    };
    mockStore = {
      findNodeByURL: jest.fn(),
      saveNode: jest.fn(),
    };
    worker = new Worker(mockQueue, mockStore);
  });

  it('should process a task', async () => {
    const task: ITask = { url: 'https://www.enki.com/test' };
    mockStore.findNodeByURL.mockResolvedValueOnce(null);
    await worker['worker'](task);
    expect(mockStore.findNodeByURL).toHaveBeenCalledWith(task.url);
    expect(mockStore.saveNode).toHaveBeenCalled();
  });

  it('should not process a task if node already exists', async () => {
    const task: ITask = { url: 'https://www.enki.com/test' };
    mockStore.findNodeByURL.mockResolvedValueOnce({}); // Assuming a node is an object
    await worker['worker'](task);
    expect(mockStore.findNodeByURL).toHaveBeenCalledWith(task.url);
    expect(mockStore.saveNode).not.toHaveBeenCalled();
  });

  it('should add a URL to the queue', async () => {
    const url = 'https://www.enki.com/test';
    mockStore.findNodeByURL.mockResolvedValueOnce(null);
    await worker['addToQueue'](url);
    expect(mockQueue.add).toHaveBeenCalledWith({ url });
  });

  it('should not add a URL to the queue if it already exists in the store', async () => {
    const url = 'https://www.enki.com/test';
    mockStore.findNodeByURL.mockResolvedValueOnce({});
    await worker['addToQueue'](url);
    expect(mockQueue.add).not.toHaveBeenCalled();
  });

  it('should not add a URL to the queue if it does not start with the correct domain', async () => {
    const url = 'https://www.test.com';
    await worker['addToQueue'](url);
    expect(mockQueue.add).not.toHaveBeenCalled();
  });
});