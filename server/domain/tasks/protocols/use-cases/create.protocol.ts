import { IExecute } from "../../../shared";
import { CreateTaskRequest } from "../../models";

export interface ICreateTaskUseCase
  extends IExecute<CreateTaskRequest, Promise<void>> {
  execute(request: CreateTaskRequest): Promise<void>;
}
