import { IExecute, IdentityQuery } from "../../../shared";
import { ChangeTaskStateRequest } from "../../models";

export interface IChangeTaskStateUseCase
  extends IExecute<IdentityQuery & ChangeTaskStateRequest, Promise<boolean>> {
  execute(request: IdentityQuery & ChangeTaskStateRequest): Promise<boolean>;
}
