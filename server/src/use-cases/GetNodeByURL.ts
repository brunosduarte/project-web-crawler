import { INodeStore } from '@/interfaces/stores/INodeStore';
import { INode } from '@/entities/INode';

export class GetNodeByURL {
  constructor(private store: INodeStore) {}

  async execute(url: string): Promise<INode | null> {
    try {
      const found = await this.store.findByURL(url);
      return found;
    } catch (e) {
      console.error('Error fetching node by URL', e);
      throw new Error('Unable to fetch node by URL');
    }
  }
}
