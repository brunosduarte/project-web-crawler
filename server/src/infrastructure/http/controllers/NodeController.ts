import { FastifyRequest, FastifyReply } from 'fastify';

import { INodeStore } from '@/application/interfaces/INodeStore';

export class NodeController {
  constructor(private store: INodeStore) {}

  public async listNode(req: FastifyRequest, res: FastifyReply): Promise<void> {
    try {
      res.send(await this.store.list())
    } catch (e: any) {
      console.error('listNode: ', e?.message)
      res.status(500).send('Error listing node: '+e?.message);
    }
  }

  public async getNodeByURL(req: FastifyRequest|any, res: FastifyReply): Promise<void> {
    try {
      const found = await this.store.findByURL(req.params.url);
      if(!found) {
        res.status(404).send('Content not found');
        return;
      }
      res.send(found);
    } catch (e: any) {
      console.error('getNodeByURL: ', e?.message)
      res.status(500).send('Error getting node by URL: '+e?.message);
    }
  }
}

