import "reflect-metadata";

import { injectable } from "inversify";

import { PartialProject, Project } from "../entities";
import { IProjectRepository, Identity } from "../interfaces";

@injectable()
export class ProjectRepository implements IProjectRepository {
  private projects: Project[] = new Array<Project>();

  private _autoIncrementId(): number {
    const toMax = (prev: Project, next: Project) =>
      prev.id > next.id ? prev : next;

    return this.projects.reduce(toMax).id || 1;
  }

  async list(): Promise<Array<Project>> {
    return await new Promise<Array<Project>>((resolve, reject) => {
      try {
        resolve(this.projects);
      } catch (err) {
        resolve(new Array<Project>());
      }
    });
  }

  async find(id: number): Promise<Project> {
    return await new Promise<Project>((resolve, reject) => {
      try {
        const comparer = (project: Project) => project.id === id;
        const project = this.projects.find(comparer);

        resolve(project);
      } catch (err) {
        resolve(undefined);
      }
    });
  }

  async create(name: string): Promise<boolean> {
    return await new Promise<boolean>((resolve, reject) => {
      try {
        const id = this._autoIncrementId();
        const project = new Project(id, name);

        this.projects.push(project);
        resolve(true);
      } catch (err) {
        resolve(false);
      }
    });
  }

  async remove(targets: Array<Identity<number>>): Promise<boolean> {
    return await new Promise<boolean>((resolve, reject) => {
      try {
        const exclusion = (target: Identity<number>) => {
          const comparer = ({ id }: Project) => target.id !== id;
          this.projects = this.projects.filter(comparer);
        };

        targets.forEach(exclusion);

        resolve(true);
      } catch (err) {
        resolve(false);
      }
    });
  }

  async edit(target: PartialProject): Promise<boolean> {
    return await new Promise<boolean>((resolve, reject) => {
      try {
        const merge = (project: Project) => {
          if (project.id === target.id) {
            return Object.assign(Project, project, target);
          }

          return project;
        };

        this.projects = this.projects.map(merge);
        resolve(true);
      } catch (err) {
        resolve(false);
      }
    });
  }
}
