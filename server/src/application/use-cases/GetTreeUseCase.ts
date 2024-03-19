import { INode } from "@/domain/entities/INode";
import { IScrapResult } from "@/domain/entities/IScrapResult";
import { isNotNil } from "@/shared/helpers/guards"
import { INodeStore } from "@/application/interfaces/INodeStore";

export class GetTreeUseCase {

  private consumed = new Set<string>();
  private map = new Map<string, IScrapResult>();

  constructor(private store: INodeStore) {}

  async execute(): Promise<Partial<INode>>{
    const list = await this.store.list();
    list.forEach(item => this.map.set(item.url, item));
    const root = this.map.get(list[0]?.url);
    return root ? this.iterateNode(root) : {} 
  }

  private iterateNode(node: IScrapResult): INode {
    if(!node.done) {
      return node;
    }
    const isConsumed = this.consumed.has(node.url);
    if(!isConsumed) {
      this.consumed.add(node.url);
    }
    const children = isConsumed 
      ? undefined 
      : node.items
        .map((item: { href: string; }) => {
          const child = this.map.get(item.href);
          const isParent = child?.url === node.url;
          if(!child || isParent) {
            return undefined;
          }
          
          const result = this.iterateNode(child);
          return result;
        })
        .filter(isNotNil);

    return {
      done: true,
      url: node.url,
      title: node.title,
      children,
    }
  } 
}