import { IScrapResult } from '@/domain/entities/IScrapResult';
import { INodeStore } from '@/application/interfaces/INodeStore';

export class NodeStoreInMemory implements INodeStore {
  private data: Map<string, IScrapResult> = new Map();
  static clear: any;

  async saveResult(data: IScrapResult | any): Promise<void> {
    this.data.set(data.url, data);
  }

  async findByURL(url: string): Promise<IScrapResult | undefined> {
    return this.data.get(url);
  }

  async list(): Promise<IScrapResult[]> {
    return Array.from(this.data.values());
  }

  async count(): Promise<number> {
    return this.data.size;
  }

  clear(): void {   
    return this.data.clear();
  }
}
