import { IScrapResult } from "../entities/IScrapResult";

export interface INodeStore {
  saveNode(node: IScrapResult): Promise<void>;
  findNodeByURL(url: string): Promise<IScrapResult | undefined>;
  listNodes(): Promise<IScrapResult[]>;
  countNodes(): Promise<number>;
}