import { IExecute, IdentityQuery } from "../../../shared";
import { EditProjectRequest } from "../../models";

export interface IEditProjectByIdUseCase
  extends IExecute<IdentityQuery & EditProjectRequest, Promise<boolean>> {
  execute(request: IdentityQuery & EditProjectRequest): Promise<boolean>;
}
