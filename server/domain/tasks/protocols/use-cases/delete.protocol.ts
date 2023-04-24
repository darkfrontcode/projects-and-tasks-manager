import { IExecute, IdentityQuery } from "../../../shared";

export interface IDeleteTaskByIdUseCase
  extends IExecute<IdentityQuery, Promise<boolean>> {
  execute(request: IdentityQuery): Promise<boolean>;
}
