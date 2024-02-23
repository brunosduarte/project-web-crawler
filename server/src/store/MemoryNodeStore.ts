import { IScrapResult } from '../entities/IScrapResult';
import { INodeStore } from './INodeStore';

export class MemoryNodeStore implements INodeStore {
  private data: Map<string, IScrapResult> = new Map();

  async saveResult(data: IScrapResult): Promise<void> {
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
}
