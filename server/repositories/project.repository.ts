import { injectable } from 'inversify';
import {
  Identity,
  IPartialProject,
  IProject,
  IProjectRepository,
} from '../interfaces';
import 'reflect-metadata';

@injectable()
export class ProjectRepository implements IProjectRepository {
  private projects: IProject[] = new Array<IProject>();

  public async list(): Promise<Array<IProject>> {
    return await new Promise<Array<IProject>>((resolve, reject) => {
      try {
        resolve(this.projects);
      } catch (err) {
        resolve(new Array<IProject>());
      }
    });
  }

  public async find(id: number): Promise<IProject> {
    return await new Promise<IProject>((resolve, reject) => {
      try {
        const comparer = (project: IProject) => project.id === id;
        const project = this.projects.find(comparer);

        resolve(project);
      } catch (err) {
        resolve(undefined);
      }
    });
  }

  public async add(project: IProject): Promise<boolean> {
    return await new Promise<boolean>((resolve, reject) => {
      try {
        this.projects.push(project);
        resolve(true);
      } catch (err) {
        resolve(false);
      }
    });
  }

  public async remove(targets: Array<Identity<number>>): Promise<boolean> {
    return await new Promise<boolean>((resolve, reject) => {
      try {
        const exclusion = (target: Identity<number>) => {
          this.projects = this.projects.filter(({ id }) => target.id !== id);
        };

        targets.forEach(exclusion);

        resolve(true);
      } catch (err) {
        resolve(false);
      }
    });
  }

  public async edit(target: IPartialProject): Promise<boolean> {
    return await new Promise<boolean>((resolve, reject) => {
      try {
        const merge = (project: IProject) =>
          project.id === target.id ? { ...project, ...target } : project;

        this.projects = this.projects.map(merge);
        resolve(true);
      } catch (err) {
        resolve(false);
      }
    });
  }
}
