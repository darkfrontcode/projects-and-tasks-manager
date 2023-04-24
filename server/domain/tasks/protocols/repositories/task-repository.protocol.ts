import { PartialTask, Task } from "../../entities";
import { TaskState } from "../../enums";

export interface ITaskRepository {
  list(): Promise<Array<Task>>;
  find(id: number): Promise<Task>;
  create(name: string, manager: string, date: Date): Promise<boolean>;
  remove(id: number): Promise<boolean>;
  edit(partial: PartialTask): Promise<boolean>;
  changeState(id: number, state: TaskState): Promise<boolean>;
}
