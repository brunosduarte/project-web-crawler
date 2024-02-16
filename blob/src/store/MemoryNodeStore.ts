import { INode } from '../entities/INode';
import { IScrapResult } from '../entities/IScrapResult';
import { INodeStore } from './INodeStore';

export class MemoryNodeStore implements INodeStore {
  private data: IScrapResult[] = [];
  
  async saveNode(node: IScrapResult): Promise<void> {
    this.data.push(node)
  }

  async findNodeByURL(url: string): Promise<IScrapResult | undefined> {
    const found = this.data.find(node => node.rootUrl === url)
    return found;
  }

  async listNodes(): Promise<IScrapResult[]> {
    return [...this.data];
  }

  async countNodes(): Promise<number> {
    return this.data.length;
  }
}
