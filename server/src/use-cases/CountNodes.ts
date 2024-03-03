import { INodeStore } from '@/interfaces/stores/INodeStore';

export class CountNodes {
  constructor(private store: INodeStore) {}

  async execute() {
    try {
      const count = await this.store.count();
      return count;
    } catch (e) {
      console.error('Error counting nodes', e);
      throw new Error('Unable to count nodes');
    }
  }
}
