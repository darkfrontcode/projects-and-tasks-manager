import { IExecute, IdentityQuery } from "../../../shared";
import { AttachTaskToProjectRequest } from "../../models";

export interface IAttachTaskToProjectUseCase
  extends IExecute<
    IdentityQuery & AttachTaskToProjectRequest,
    Promise<boolean>
  > {
  execute(
    request: IdentityQuery & AttachTaskToProjectRequest
  ): Promise<boolean>;
}
