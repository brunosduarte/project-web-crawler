import { IScrapResult } from "@/domain/entities/IScrapResult";

export interface INodeStore {
  saveResult(data: IScrapResult): Promise<void>;
  findByURL(url: string): Promise<IScrapResult | undefined>;
  list(): Promise<IScrapResult[]>;
  count(): Promise<number>;
}