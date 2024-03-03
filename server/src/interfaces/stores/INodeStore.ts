import { INode } from "@/entities/INode";

export interface INodeStore {
  list(): Promise<INode[]>;
  findByURL(url: string): Promise<INode | null>;
  count(): Promise<number>;
}
