import { INodeStore } from '@/interfaces/stores/INodeStore';
import { INode } from '@/entities/INode';
import { GetTree } from './GetTree';

export interface IGetTreeASCIIOptions {
  store: INodeStore
}

export class GetTreeASCII {
  private getTree: GetTree;
  private store: INodeStore

  constructor(private readonly options: IGetTreeASCIIOptions) {
    this.store = options.store
    this.getTree = new GetTree(store);
  }

  async execute(): Promise<string> {
    const tree = await this.getTree.execute();
    return this.iterateNode(tree);
  }

  private iterateNode(node: Partial<INode>, depth: number = 0): string {
    if (!node.url) {
      return '';
    }
    const header = `${''.padStart(depth,'-')} ${node.url}\n`;
    const body = node.children?.map(child => this.iterateNode(child, depth + 1)).join('') || '';
    return header + body;
  }
}
