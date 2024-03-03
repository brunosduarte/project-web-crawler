import Fastify from 'fastify';
import { ListNodes, GetNodeByURL } from '@/use-cases';

export class NodeController {
  constructor(private listNodes: ListNodes, private getNodeByURL: GetNodeByURL) {}

  async list(req: Request, res: Response) {
    // Controller logic for listing nodes
  }

  async getByURL(req: Request, res: Response) {
    // Controller logic for getting a node by URL
  }
}
