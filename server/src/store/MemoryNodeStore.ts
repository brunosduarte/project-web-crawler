import { INode } from '../entities/INode';
import { IScrapUrlDetail } from '../entities/IScapUrlDetail';
import { IScrapResult } from '../entities/IScrapResult';
import { INodeStore } from './INodeStore';

export class MemoryNodeStore implements INodeStore {
  private data: Map<string, IScrapUrlDetail[]> = new Map();

  async saveNode(domain: string, details: IScrapUrlDetail[]): Promise<void> {
    this.data.set(domain, details);
  }

  async findNodeByURL(url: string): Promise<IScrapUrlDetail | undefined> {
    for (let [domain, details] of this.data) {
      const found = details.find(detail => detail.loc === url);
      if (found) {
        return found;
      }
    }
    return undefined;
  }

  async listNodes(): Promise<IScrapResult[]> {
    return Array.from(this.data, ([domain, details]) => ({ [domain]: details }));
  }

  async countNodes(): Promise<number> {
    let count = 0;
    this.data.forEach(details => count += details.length);
    return count;
  }
}


// // import { INode } from '../entities/INode';
// // import { IScrapResult } from '../entities/IScrapResult';
// // import { INodeStore } from './INodeStore';

// // export class MemoryNodeStore implements INodeStore {
// //   private data: IScrapResult[] = [];
  
// //   async saveNode(node: IScrapResult): Promise<void> {
// //     this.data.push(node)
// //   }

// //   async findNodeByURL(url: string): Promise<IScrapResult | undefined> {
// //     const found = this.data.find(node => node.rootUrl === url)
// //     return found;
// //   }

// //   async listNodes(): Promise<IScrapResult[]> {
// //     return [...this.data];
// //   }

// //   async countNodes(): Promise<number> {
// //     return this.data.length;
// //   }
// // }
