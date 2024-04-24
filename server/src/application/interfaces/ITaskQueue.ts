import { ITask } from "@/domain/valueObjects/ITask";

export type TaskWorker = (task: ITask) => Promise<void>;

export interface ITaskQueue {
  add(task: ITask): Promise<void>;
  size(): Promise<number>;
  setWorker(worker: TaskWorker): void;
  onDone(callback: () => void): void;
  clear(): void
} 
