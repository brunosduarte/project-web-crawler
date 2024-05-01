import { FastifyReply, FastifyRequest } from 'fastify';

import { INodeStore } from '@/application/interfaces/INodeStore';
import { NodeController } from './NodeController';

describe('NodeController', () => {
  let store: INodeStore;
  let controller: NodeController;

  beforeEach(() => {
    store = {
      findByURL: vi.fn(),
      list: vi.fn(),
    };
    controller = new NodeController(store);
  });

  describe('getNodeByURL', () => {
    const req: FastifyRequest = { params: { url: 'test-url' } } as any;
    const res: FastifyReply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as any;

    it('should return the node when it is found', async () => {
      const node = { url: 'test-url', content: 'test-content' };
      (store.findByURL as vi.Mock).mockResolvedValue(node);

      await controller.getNodeByURL(req, res);

      expect(res.send).toHaveBeenCalledWith(node);
    });

    it('should return 404 when the node is not found', async () => {
      (store.findByURL as vi.Mock).mockResolvedValue(null);

      await controller.getNodeByURL(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('Content not found');
    });

    it('should return 500 when an error occurs', async () => {
      const error = new Error('test error');
      (store.findByURL as vi.Mock).mockRejectedValue(error);

      await controller.getNodeByURL(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Error getting node by URL: ' + error.message);
    });
  });
});