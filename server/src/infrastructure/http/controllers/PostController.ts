import { FastifyRequest, FastifyReply } from 'fastify';
import { queue } from '@/infrastructure/app';

export class PostController{

  constructor() {}
  
  public async sendURL(req: FastifyRequest, res: FastifyReply): Promise<void> {
    try {
      const { domain } = req.body;
      res.status(200).send();
      queue.add({ url: domain });
    } catch (e) {
      // TODO: handle errors with middleware
      res.status(500).send();
    }
  }
}