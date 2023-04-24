import "reflect-metadata";

import { injectable } from "inversify";

import { PartialProject, Project } from "../entities";
import { IProjectRepository } from "../protocols";

@injectable()
export class ProjectRepository implements IProjectRepository {
  private _projects: Project[] = new Array<Project>();

  private _autoIncrementId(): number {
    if (this._projects.length > 0) {
      const toMax = (prev: Project, next: Project) =>
        prev.id > next.id ? prev : next;
      const { id } = this._projects.reduce(toMax);

      return id + 1;
    }

    return 1;
  }

  async list(): Promise<Array<Project>> {
    return await new Promise<Array<Project>>((resolve, reject) => {
      try {
        resolve(this._projects);
      } catch (err) {
        resolve(new Array<Project>());
      }
    });
  }

  async find(id: number): Promise<Project> {
    return await new Promise<Project>((resolve, reject) => {
      try {
        const comparer = (project: Project) => project.id === id;
        const project = this._projects.find(comparer);

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

        this._projects.push(project);
        resolve(true);
      } catch (err) {
        resolve(false);
      }
    });
  }

  async remove(id: number): Promise<boolean> {
    return await new Promise<boolean>(async (resolve, reject) => {
      try {
        const valid = await this.find(id);

        if (valid) {
          const comparer = (project: Project) => project.id !== id;
          this._projects = this._projects.filter(comparer);
          resolve(true);
        }

        resolve(false);
      } catch (err) {
        resolve(false);
      }
    });
  }

  async edit(partial: PartialProject): Promise<boolean> {
    return await new Promise<boolean>(async (resolve, reject) => {
      try {
        const valid = await this.find(partial.id);

        if (valid) {
          const merge = (project: Project) => {
            if (project.id === partial.id) {
              project.fromPartial = partial;
            }

            return project;
          };

          this._projects = this._projects.map(merge);
          resolve(true);
        }

        resolve(false);
      } catch (err) {
        resolve(false);
      }
    });
  }
}
