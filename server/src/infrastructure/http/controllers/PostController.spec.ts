import { FastifyReply, FastifyRequest } from 'fastify';

import { queue, store } from '@/infrastructure/app';
import { PostController } from './PostController';

describe('PostController', () => {
  let controller: PostController;
  let req: FastifyRequest;
  let res: FastifyReply;

  beforeEach(() => {
    controller = new PostController();
    req = { body: { domain: 'test-domain' } } as any;
    res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as any;
    store.clear = vi.fn();
    queue.clear = vi.fn();
    queue.add = vi.fn();
  });

  it('should add URL to the queue and send status 200', async () => {
    await controller.sendURL(req, res);

    expect(store.clear).toHaveBeenCalled();
    expect(queue.clear).toHaveBeenCalled();
    expect(queue.add).toHaveBeenCalledWith({ url: req.body.domain });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });

  it('should send status 500 when an error occurs', async () => {
    const error = new Error('test error');
    (queue.add as vi.Mock).mockRejectedValue(error);

    await controller.sendURL(req, res);

    expect(store.clear).toHaveBeenCalled();
    expect(queue.clear).toHaveBeenCalled();
    expect(queue.add).toHaveBeenCalledWith({ url: req.body.domain });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Error sending URL: ' + error.message);
  });
});