import { IExecute, IdentityQuery } from "../../../shared";
import { Task } from "../../entities";

export interface IGetTaskByIdUseCase
  extends IExecute<IdentityQuery, Promise<Task>> {
  execute(request: IdentityQuery): Promise<Task>;
}
