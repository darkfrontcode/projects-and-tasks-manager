import { Identity } from "./identity.interface";
import { IPartialProject, IProject } from "./project.interface";

export interface IProjectService {
  list(): Promise<Array<IProject>>;
  add(project: IProject): Promise<boolean>;
  remove(targets: Array<Identity<number>>): Promise<boolean>;
  edit(target: IPartialProject): Promise<boolean>;
}
