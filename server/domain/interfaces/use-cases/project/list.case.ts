import { Project } from "../../../entities";
import { IExecute } from "../../shared";

export interface IListProjectUseCase
  extends IExecute<null, Promise<Project[]>> {
  execute(): Promise<Project[]>;
}
