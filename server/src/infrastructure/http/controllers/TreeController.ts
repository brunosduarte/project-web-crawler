import { GetTree } from '@/use-cases';
import { INodeStore as InMemoryNodeStore } from '@/infrastructure/store/InMemoryNodeStore';
import { INode } from '@/domain/entities/INode';

export interface ITreeController {
  store: InMemoryNodeStore
}
export class TreeController {
  private readonly store: InMemoryNodeStore

  constructor(private getTree: GetTree) {
    this.store = options.store
  }

  async get(req: Request, res: Response): Promise<void> {
    try {
      const usecase = new GetTree(this.store)
      res.send(await usecase.execute())
    } catch (e) {
      console.error('Server.getTree', e)
      // TODO: handle errors with middleware
      res.status(500).send()
    }
  }

  async getASCII(req: Request, res: Response): Promise<void> {
    try {
      const usecase = new GetTree(this.store)
      const tree = await usecase.execute()
      const iterateNode = (node: Partial<INode>, dept = 0): string => {
        if (!node.url) {
          return ''
        }
        const header = `${''.padStart(dept, '-')} ${node.url}\n`
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
