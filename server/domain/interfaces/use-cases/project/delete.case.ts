import { IExecute, IdentityQuery } from "../../shared";

export interface IDeleteProjectByIdUseCase
  extends IExecute<IdentityQuery[], Promise<void>> {
  execute(request: IdentityQuery[]): Promise<void>;
}
