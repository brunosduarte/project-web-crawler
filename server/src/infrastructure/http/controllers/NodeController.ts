import { FastifyRequest, FastifyReply } from 'fastify';
import { INodeStore } from '@/application/interfaces/INodeStore';

export class NodeController {
  constructor(private store: INodeStore) {}

  public async listNode(req: FastifyRequest, res: FastifyReply): Promise<void> {
    try {
      res.send(await this.store.list())
    } catch (e) {
      // TODO: handle errors with middleware
      res.status(500).send();
    }
  }

  public async getNodeByURL(req: FastifyRequest, res: FastifyReply): Promise<void> {
    try {
      const found = await this.store.findByURL(req.params.url);
      if(!found) {
        res.status(404).send();
      //TODO: handle errors
        return;
      }
      res.send(found);
    } catch (e) {
      // TODO: handle errors with middleware
      res.status(500).send();
    }
  }

  public async countNodes(req: FastifyRequest, res: FastifyReply): Promise<void> {
    try {
      const count = await this.store.count();
      res.send({ count });
    } catch (e) {
      // TODO: handle errors with middleware
      res.status(500).send();
    }
  }
}

