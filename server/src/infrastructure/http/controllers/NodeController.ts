import { FastifyRequest, FastifyReply } from 'fastify';
import { INodeStore } from '@/application/interfaces/INodeStore';

export class NodeController {
  constructor(private store: INodeStore) {}

  public async listNode(req: FastifyRequest, res: FastifyReply): Promise<void> {
    try {
      res.send(await this.store.list())
    } catch (e) {
      // TODO: handle errors with middleware
      console.error('listNode', e)
      res.status(500).send('Error1');
    }
  }

  public async getNodeByURL(req: FastifyRequest|any, res: FastifyReply): Promise<void> {
    try {
      const found = await this.store.findByURL(req.params.url);
      if(!found) {
        res.status(404).send('Error2');
      //TODO: handle errors
        return;
      }
      res.send(found);
    } catch (e) {
      // TODO: handle errors with middleware
      console.error('getNodeByURL', e)
      res.status(500).send('Error3');
    }
  }

  public async countNodes(req: FastifyRequest, res: FastifyReply): Promise<void> {
    try {
      const count = await this.store.count();
      res.send({ count });
    } catch (e) {
      // TODO: handle errors with middleware
      console.error('countNodes', e)
      res.status(500).send('Error4');
    }
  }
}

