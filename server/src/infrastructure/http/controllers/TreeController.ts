import { FastifyRequest, FastifyReply } from 'fastify';

import { INode } from '@/domain/entities/INode';
import { INodeStore } from '@/application/interfaces/INodeStore';
import { GetTreeUseCase } from '@/application/use-cases/GetTreeUseCase';

export class TreeController {
  
  constructor(public store: INodeStore) {}

  public async getTree(req: FastifyRequest, res: FastifyReply): Promise<void> {
    try {
      const usecase = new GetTreeUseCase(this.store)
      res.send(await usecase.execute())
    } catch (e: any) {
      console.error('getTree: ', e?.message)
      res.status(500).send('Error getting tree: '+e?.message)
    }
  }

  public async getTreeASCII(req: FastifyRequest, res: FastifyReply): Promise<void> {
    try {
      const usecase = new GetTreeUseCase(this.store)
      const tree = await usecase.execute()
      const iterateNode = (node: Partial<INode>, dept = 0): string => {
        if (!node.url) {
          return ''
        }
        const header = `${''.padStart(dept,'-')} ${node.url}\n`
        const body = node.children?.map(child => iterateNode(child, dept + 1)).join('\n') || ''
        return header + body
      }
      res.header('Content-Type', 'text/plain');
      res.send(iterateNode(tree, 0));
    } catch (e: any) {
      console.error('getTreeASCII: ', e?.message)
      res.status(500).send('Error getting ASCII: '+e?.message)
    }
  }
}
