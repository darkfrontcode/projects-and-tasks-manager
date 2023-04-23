import { PartialProject, Project } from "../../entities";

export interface IProjectRepository {
  list(): Promise<Array<Project>>;
  find(id: number): Promise<Project>;
  create(name: string): Promise<boolean>;
  remove(id: number): Promise<boolean>;
  edit(target: PartialProject): Promise<boolean>;
}
