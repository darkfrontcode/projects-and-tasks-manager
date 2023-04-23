import { PartialProject, Project } from "../../entities";
import { Identity } from "../shared";

export interface IProjectRepository {
  list(): Promise<Array<Project>>;
  find(id: number): Promise<Project>;
  create(name: string): Promise<boolean>;
  remove(targets: Array<Identity<number>>): Promise<boolean>;
  edit(target: PartialProject): Promise<boolean>;
}
