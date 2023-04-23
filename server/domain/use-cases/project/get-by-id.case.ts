import "reflect-metadata";

import { inject, injectable } from "inversify";

import { Project } from "../../entities";
import {
  IGetProjectByIdUseCase,
  IProjectRepository,
  IdentityQuery,
} from "../../interfaces";
import { ProjectRepository } from "../../repositories";

@injectable()
export class GetProjectById implements IGetProjectByIdUseCase {
  constructor(
    @inject(ProjectRepository.name)
    private _projectRepository: IProjectRepository
  ) {}

  async execute({ id }: IdentityQuery): Promise<Project> {
    return await this._projectRepository.find(+id);
  }
}