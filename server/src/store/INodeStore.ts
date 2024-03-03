import { IScrapResult } from "@/entities/IScrapResult";

export interface INodeStore {
  saveResult(data: IScrapResult): Promise<void>;
  findByURL(url: string): Promise<IScrapResult | undefined>;
  list(): Promise<IScrapResult[]>;
  count(): Promise<number>;
}