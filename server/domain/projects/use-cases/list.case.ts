import "reflect-metadata";

import { inject, injectable } from "inversify";
import { ITaskRepository, TaskRepository } from "../../tasks";
import { Project } from "../entities";
import { IListProjectUseCase, IProjectRepository } from "../protocols";
import { ProjectRepository } from "../repositories";

@injectable()
export class ListProject implements IListProjectUseCase {
  // prettier-ignore
  constructor(
    @inject(ProjectRepository.name) private _projectRepository: IProjectRepository,
    @inject(TaskRepository.name) private _taskRepository: ITaskRepository
  ) {}

  async execute(): Promise<Project[]> {
    const result = await this._projectRepository.list();

    const pending = result.map(async (project: Project) => {
      const tasks = await this._taskRepository.findByProjectId(project.id);
      project.reflectTasks(tasks);
      return project;
    });

    return await Promise.all(pending);
  }
}
