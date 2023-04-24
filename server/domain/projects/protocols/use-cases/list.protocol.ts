import { IExecute } from "../../../shared";
import { Project } from "../../entities";

export interface IListProjectUseCase
  extends IExecute<null, Promise<Project[]>> {
  execute(): Promise<Project[]>;
}
