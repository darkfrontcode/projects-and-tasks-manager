import { Identity } from './identity.interface';
import { IPartialProject, IProject } from './project.interface';

export interface IProjectRepository {
  list(): Promise<Array<IProject>>;
  find(id: number): Promise<IProject>;
  add(project: IProject): Promise<boolean>;
  remove(targets: Array<Identity<number>>): Promise<boolean>;
  edit(target: IPartialProject): Promise<boolean>;
}
