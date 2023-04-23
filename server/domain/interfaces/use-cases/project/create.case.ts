import { CreateProjectRequest } from "../../../models";
import { IExecute } from "../../shared";

export interface ICreateProjectUseCase
  extends IExecute<CreateProjectRequest, Promise<void>> {
  execute(request: CreateProjectRequest): Promise<void>;
}
