import { Project } from "../../../entities";
import { IExecute, IdentityQuery } from "../../shared";

export interface IGetProjectByIdUseCase
  extends IExecute<IdentityQuery, Promise<Project>> {
  execute(request: IdentityQuery): Promise<Project>;
}
