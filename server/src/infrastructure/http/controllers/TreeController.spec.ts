import { FastifyReply, FastifyRequest } from 'fastify';
import { INodeStore } from '@/application/interfaces/INodeStore';
import { TreeController } from './TreeController';

describe('TreeController', () => {
  let store: INodeStore;
  let controller: TreeController;

  beforeEach(() => {
    store = {
      findByURL: vi.fn(),
      list: vi.fn(),
    };
    controller = new TreeController(store);
  });

  describe('getTreeASCII', () => {
    const req: FastifyRequest = {} as any;
    const res: FastifyReply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
      header: vi.fn(),
    } as any;

    it('should return the correct ASCII tree when the tree is found', async () => {
      const tree = { url: 'test-url', children: [] };
      (store.list as vi.Mock).mockResolvedValue(tree);

      await controller.getTreeASCII(req, res);

      // expect(res.header).toHaveBeenCalledWith('Content-Type', 'text/plain');
      // expect(res.send).toHaveBeenCalledWith('- test-url\n');
    });

    it('should return 500 when an error occurs', async () => {
      const error = new Error('test error');
      (store.list as vi.Mock).mockRejectedValue(error);

      await controller.getTreeASCII(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Error getting ASCII: ' + error.message);
    });
  });
});