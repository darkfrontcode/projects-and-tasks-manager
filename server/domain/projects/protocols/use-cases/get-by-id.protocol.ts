import { IExecute, IdentityQuery } from "../../../shared";
import { Project } from "../../entities";

export interface IGetProjectByIdUseCase
  extends IExecute<IdentityQuery, Promise<Project>> {
  execute(request: IdentityQuery): Promise<Project>;
}
