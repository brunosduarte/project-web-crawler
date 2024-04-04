import { Request, Response } from 'express';

import { INode } from '@/domain/entities/INode';
import { InMemoryNodeStore } from '@/infrastructure/store/InMemoryNodeStore';
import { GetTreeUseCase } from '@/application/use-cases/GetTreeUseCase';
import { INodeStore } from '@/application/interfaces/INodeStore';

export class TreeController {
  
  constructor(public store: INodeStore = new InMemoryNodeStore()) {}

  public async getTree(req: Request, res: Response): Promise<void> {
    try {
      const usecase = new GetTreeUseCase(this.store)
      res.send(await usecase.execute())
    } catch (e) {
      console.error('Server.getTree', e)
      // TODO: handle errors with middleware
      res.status(500).send()
    }
  }

  public async getTreeASCII(req: Request, res: Response): Promise<void> {
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

      res.setHeader('Content-Type', 'text/plain').send(iterateNode(tree, 0))
    } catch (e) {
      console.error('Server.getTree', e)
      // TODO: handle errors with middleware
      res.status(500).send()
    }
  }
}
