import { ITask } from "@/entities/ITask";

export type TaskWorker = (task: ITask) => Promise<void>;

export interface ITaskQueue {
  add(task: ITask): Promise<void>;
  setWorker(worker: TaskWorker): void;
  size(): Promise<number>;
} 
