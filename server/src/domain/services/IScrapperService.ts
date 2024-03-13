import { IScrapResult } from "@/domain/entities/IScrapResult";

export interface IScrapperService {
  scrap(url: string): Promise<IScrapResult>;
}
