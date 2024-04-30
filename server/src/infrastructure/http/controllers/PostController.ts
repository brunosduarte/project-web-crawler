import { FastifyRequest, FastifyReply } from 'fastify';

import { queue, store } from '@/infrastructure/app';

export class PostController{

  public async sendURL(req: FastifyRequest|any, res: FastifyReply): Promise<void> {
    const { domain } = req.body;
    store.clear()
    queue.clear()
    try {
      await queue.add({ url: domain });
      await res.status(200).send();
    } catch (e: any) {
      console.log('sendURL: ', e?.message)
      res.status(500).send('Error sending URL: '+e?.message);
    }
  }
}