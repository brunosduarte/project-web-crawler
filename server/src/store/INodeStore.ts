import { IScrapUrlDetail } from "../entities/IScapUrlDetail";

export interface INodeStore {
  saveNode(domain: string, details: IScrapUrlDetail[]): Promise<void>;
  findNodeByURL(url: string): Promise<IScrapUrlDetail | undefined>;
  listNodes(): Promise<{ [domain: string]: IScrapUrlDetail[] }[]>;
  countNodes(): Promise<number>;
}

