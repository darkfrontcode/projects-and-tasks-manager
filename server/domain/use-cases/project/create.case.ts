import "reflect-metadata";

import { inject, injectable } from "inversify";

import { ICreateProjectUseCase, IProjectRepository } from "../../interfaces";
import { CreateProjectRequest } from "../../models";
import { ProjectRepository } from "../../repositories";

@injectable()
export class CreateProject implements ICreateProjectUseCase {
  constructor(
    @inject(ProjectRepository.name)
    private _projectRepository: IProjectRepository
  ) {}

  async execute({ name }: CreateProjectRequest): Promise<void> {
    await this._projectRepository.create(name);
  }
}
