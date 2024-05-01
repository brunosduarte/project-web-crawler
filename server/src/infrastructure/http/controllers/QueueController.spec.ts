import { FastifyReply, FastifyRequest } from 'fastify';

import { INodeStore } from '@/application/interfaces/INodeStore';
import { ITaskQueue } from '@/application/interfaces/ITaskQueue';
import { QueueController } from './QueueController';

describe('QueueController', () => {
  let queue: ITaskQueue;
  let store: INodeStore;
  let controller: QueueController;

  beforeEach(() => {
    queue = {
      size: vi.fn(),
    };
    store = {
      count: vi.fn(),
    };
    controller = new QueueController(queue, store);
  });

  describe('getQueueStatus', () => {
    const req: FastifyRequest = {} as any;
    const res: FastifyReply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as any;

    it('should return the queue status', async () => {
      const pending = 5;
      const total = 10;
      (queue.size as vi.Mock).mockResolvedValue(pending);
      (store.count as vi.Mock).mockResolvedValue(total);

      await controller.getQueueStatus(req, res);

      expect(res.send).toHaveBeenCalledWith({ pending, total, percentDone: 50 });
    });

    it('should return 500 when an error occurs', async () => {
      const error = new Error('test error');
      (queue.size as vi.Mock).mockRejectedValue(error);

      await controller.getQueueStatus(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Error processing queue: ' + error.message);
    });
  });
});