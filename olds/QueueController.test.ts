import { Request, Response } from 'express';
import { QueueController } from './QueueController';
import { INodeStore } from '@/application/interfaces/INodeStore';
import { ITaskQueue } from '@/application/interfaces/ITaskQueue';

describe('QueueController', () => {
  let queueController: QueueController;
  let mockQueue: ITaskQueue;
  let mockStore: INodeStore;
  let mockRequest: Request;
  let mockResponse: Response;

  beforeEach(() => {
    mockQueue = {
      size: vi.fn().mockResolvedValue(5),
      setWorker: vi.fn(),
      add: vi.fn(),
    };

    mockStore = {
      count: vi.fn().mockResolvedValue(10),
      list: vi.fn(),
      findByURL: vi.fn(),
      saveResult: vi.fn(),
    };

    mockResponse = {
      send: vi.fn(),
      status: vi.fn().mockReturnThis(),
    } as unknown as Response;

    queueController = new QueueController(mockQueue, mockStore);
  });

  describe('getQueueStatus', () => {
    it('should send queue status', async () => {
      await queueController.getQueueStatus(mockRequest, mockResponse);

      expect(mockQueue.size).toHaveBeenCalled();
      expect(mockStore.count).toHaveBeenCalled();
      expect(mockResponse.send).toHaveBeenCalledWith({
        pending: 5,
        total: 10,
        percentDone: 50,
      });
    });

    it('should send 500 status on error', async () => {
      mockQueue.size(new Error('Some error'));

      await queueController.getQueueStatus(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.send).toHaveBeenCalled();
    });
  });
});