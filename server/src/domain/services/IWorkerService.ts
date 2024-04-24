import { ITask } from "@/domain/valueObjects/ITask"

export interface IWorkerService {
  addToQueue(url: string): Promise<any>;
  end(): void;
} 