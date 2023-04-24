import { IExecute } from "../../../shared";
import { CreateProjectRequest } from "../../models";

export interface ICreateProjectUseCase
  extends IExecute<CreateProjectRequest, Promise<void>> {
  execute(request: CreateProjectRequest): Promise<void>;
}
