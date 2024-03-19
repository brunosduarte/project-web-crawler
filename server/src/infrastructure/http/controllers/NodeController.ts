import { Request, Response } from 'express';
import { INodeStore } from '@/application/interfaces/INodeStore';
import { INode } from '@/domain/entities/INode';

export class NodeController {
  constructor(private store: INodeStore) {}

  public async listNode(req: Request, res: Response): Promise<void> {
    try {
      res.send(await this.store.list())
    } catch (e) {
      // TODO: handle errors with middleware
      res.status(500).send();
    }
  }

  public async getNodeByURL(req: Request, res: Response): Promise<void> {
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

  private async countNodes(req: Request, res: Response): Promise<void> {
    try {
      const count = await this.store.count();
      res.send({ count });
    } catch (e) {
      // TODO: handle errors with middleware
      res.status(500).send();
    }
  }
}

