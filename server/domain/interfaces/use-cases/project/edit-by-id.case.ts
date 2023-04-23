import { EditProjectRequest } from "../../../models";
import { IExecute, IdentityQuery } from "../../shared";

export interface IEditProjectByIdUseCase
  extends IExecute<IdentityQuery & EditProjectRequest, Promise<boolean>> {
  execute(request: IdentityQuery & EditProjectRequest): Promise<boolean>;
}
