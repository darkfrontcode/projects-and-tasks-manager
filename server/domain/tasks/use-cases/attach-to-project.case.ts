import "reflect-metadata";

import { inject, injectable } from "inversify";
import { IOC } from "../../../application";
import { IProjectRepository, ProjectRepository } from "../../projects";
import { IdentityQuery } from "../../shared";
import { AttachTaskToProjectRequest } from "../models";
import { IAttachTaskToProjectUseCase, ITaskRepository } from "../protocols";
import { TaskRepository } from "../repositories";

@injectable()
export class AttachTaskToProject implements IAttachTaskToProjectUseCase {
  constructor(
    @inject(TaskRepository.name) private _taskRepository: ITaskRepository
  ) {}

  async execute({
    id: stringId,
    projectId: stringProjectId,
  }: IdentityQuery & AttachTaskToProjectRequest): Promise<boolean> {
    const projectRepository = IOC.container.get<IProjectRepository>(
      ProjectRepository.name
    );

    const id = Number(stringId);
    const projectId = Number(stringProjectId);

    const valid = await projectRepository.find(projectId);

    if (valid) {
      return await this._taskRepository.attachToProject(id, projectId);
    }

    return Promise.resolve(false);
  }
}
