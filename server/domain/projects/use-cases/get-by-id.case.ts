import "reflect-metadata";

import { inject, injectable } from "inversify";
import { IdentityQuery } from "../../shared";
import { ITaskRepository, TaskRepository } from "../../tasks";
import { Project } from "../entities";
import { IGetProjectByIdUseCase, IProjectRepository } from "../protocols";
import { ProjectRepository } from "../repositories";

@injectable()
export class GetProjectById implements IGetProjectByIdUseCase {
  // prettier-ignore
  constructor(
    @inject(ProjectRepository.name) private _projectRepository: IProjectRepository,
    @inject(TaskRepository.name) private _taskRepository: ITaskRepository
  ) {}

  async execute({ id }: IdentityQuery): Promise<Project> {
    const project = await this._projectRepository.find(+id);

    if (project) {
      const tasks = await this._taskRepository.findByProjectId(project.id);
      project.reflectTasks(tasks);
    }

    return Promise.resolve(project);
  }
}
