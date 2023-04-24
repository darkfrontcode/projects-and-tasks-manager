import { IExecute, IdentityQuery } from "../../../shared";
import { EditTaskRequest } from "../../models";

export interface IEditTaskByIdUseCase
  extends IExecute<IdentityQuery & EditTaskRequest, Promise<boolean>> {
  execute(request: IdentityQuery & EditTaskRequest): Promise<boolean>;
}
