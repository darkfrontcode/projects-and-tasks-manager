import { IExecute, IdentityQuery } from "../../../shared";

export interface IDeleteProjectByIdUseCase
  extends IExecute<IdentityQuery, Promise<boolean>> {
  execute(request: IdentityQuery): Promise<boolean>;
}
