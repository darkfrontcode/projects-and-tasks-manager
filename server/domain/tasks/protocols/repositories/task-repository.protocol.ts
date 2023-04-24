import { PartialTask, Task } from "../../entities";

export interface ITaskRepository {
  list(): Promise<Array<Task>>;
  find(id: number): Promise<Task>;
  create(name: string, manager: string, date: Date): Promise<boolean>;
  remove(id: number): Promise<boolean>;
  edit(partial: PartialTask): Promise<boolean>;
}
