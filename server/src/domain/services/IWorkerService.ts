export interface IWorkerService {
  addToQueue(url: string): Promise<any>;
  end(): void;
} 