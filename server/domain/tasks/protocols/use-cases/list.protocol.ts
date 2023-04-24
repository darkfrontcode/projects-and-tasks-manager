import { IExecute } from "../../../shared";
import { Task } from "../../entities";

export interface IListTasksUseCase extends IExecute<null, Promise<Task[]>> {
  execute(): Promise<Task[]>;
}
