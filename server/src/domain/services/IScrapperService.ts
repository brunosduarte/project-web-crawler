import { IScrapResult } from "@/domain/entities/IScrapResult";

export interface IScrapperService {
  scrap(url: string | URL): Promise<IScrapResult>;
  end(): Promise<void>
}
