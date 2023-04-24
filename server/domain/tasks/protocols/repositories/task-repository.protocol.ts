import { PartialTask, Task } from "../../entities";
import { TaskState } from "../../enums";

export interface ITaskRepository {
  list(): Promise<Array<Task>>;
  find(id: number): Promise<Task>;
  create(
    projectId: number,
    name: string,
    state: TaskState,
    manager: string,
    date: Date
  ): Promise<boolean>;
  remove(id: number): Promise<boolean>;
  edit(partial: PartialTask): Promise<boolean>;
}
