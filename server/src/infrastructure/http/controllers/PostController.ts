import { FastifyRequest, FastifyReply } from 'fastify';

import { queue, store } from '@/infrastructure/app';
import { ensureHttps } from '@/infrastructure/helpers/validators';

export class PostController{

  public async sendURL(req: FastifyRequest|any, res: FastifyReply): Promise<void> {
    const { domain } = req.body;
    store.clear()
    queue.clear()
    try {
      await queue.add({ url: ensureHttps(domain) });
      await res.status(200).send();
    } catch (e: any) {
      console.error('sendURL: ', e?.message)
      res.status(500).send('Error sending URL: '+e?.message);
    }
  }
}