import { IScrapUrlDetail } from "./IScapUrlDetail";

export interface IScrapResult {
  [domain: string]: IScrapUrlDetail[];
}
