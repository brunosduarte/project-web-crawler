import { ITask } from '@/domain/valueObjects/ITask';
import { ITaskQueue } from '@/application/interfaces/ITaskQueue';
import { INodeStore } from '@/application/interfaces/INodeStore';
import { WorkerService } from '@/infrastructure/services/WorkerService';
import { ScrapperService } from '@/infrastructure/services/ScrapperService';

describe('WorkerService', () => {
  let workerService: WorkerService;
  let queueMock: vi.Mocked<ITaskQueue>;
  let storeMock: vi.Mocked<INodeStore>;
  let scrapperMock: vi.Mocked<ScrapperService>;

  beforeEach(() => {
    queueMock = {
      setWorker: vi.fn(),
      add: vi.fn(),
    } as any;

    storeMock = {
      findByURL: vi.fn(),
      saveResult: vi.fn(),
    } as any;

    scrapperMock = {
      scrap: vi.fn(),
      end: vi.fn(),
    } as any;

    workerService = new WorkerService(queueMock, storeMock);
    workerService.scrapper = scrapperMock;
  });

  it('should process a task', async () => {
    const task: ITask = { url: 'https://example.com' };
    storeMock.findByURL.mockResolvedValueOnce(null);
    scrapperMock.scrap.mockResolvedValueOnce({ items: [] });
    await workerService.worker(task);
    expect(storeMock.findByURL).toHaveBeenCalledWith(task.url);
    expect(scrapperMock.scrap).toHaveBeenCalledWith(task.url);
  });

  it('should add a task to the queue', async () => {
    const url = 'https://example.com';
    storeMock.findByURL.mockResolvedValueOnce(null);
    await workerService.addToQueue(url);
    expect(storeMock.findByURL).toHaveBeenCalledWith(url);
    expect(storeMock.saveResult).toHaveBeenCalledWith({ done: false, url });
    expect(queueMock.add).toHaveBeenCalledWith({ url });
  });

  it('should not add a task to the queue if it already exists', async () => {
    const url = 'https://example.com';
    storeMock.findByURL.mockResolvedValueOnce({});
    await workerService.addToQueue(url);
    expect(storeMock.findByURL).toHaveBeenCalledWith(url);
    expect(storeMock.saveResult).not.toHaveBeenCalled();
    expect(queueMock.add).not.toHaveBeenCalled();
  });

  it('should end the scrapper service', () => {
    workerService.end();
    expect(scrapperMock.end).toHaveBeenCalled();
  });
});