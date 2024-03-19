import { IScrapResult } from "@/domain/entities/IScrapResult";

export interface INodeStore {
  saveResult(data: IScrapResult): Promise<void>;
  findByURL(url: string | void): Promise<IScrapResult | void>;
  list(): Promise<IScrapResult[]>;
  count(): Promise<number>;
}