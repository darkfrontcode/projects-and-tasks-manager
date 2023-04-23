import "reflect-metadata";

import { inject, injectable } from "inversify";

import { Project } from "../../entities";
import { IListProjectUseCase, IProjectRepository } from "../../interfaces";
import { ProjectRepository } from "../../repositories";

@injectable()
export class ListProject implements IListProjectUseCase {
  constructor(
    @inject(ProjectRepository.name)
    private _projectRepository: IProjectRepository
  ) {}

  async execute(): Promise<Project[]> {
    return await this._projectRepository.list();
  }
}
