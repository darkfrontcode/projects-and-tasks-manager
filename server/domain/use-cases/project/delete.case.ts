import "reflect-metadata";

import { inject, injectable } from "inversify";

import {
  IDeleteProjectByIdUseCase,
  IProjectRepository,
  IdentityQuery,
} from "../../interfaces";
import { ProjectRepository } from "../../repositories";

@injectable()
export class DeleteProjectById implements IDeleteProjectByIdUseCase {
  constructor(
    @inject(ProjectRepository.name)
    private _projectRepository: IProjectRepository
  ) {}

  async execute({ id }: IdentityQuery): Promise<boolean> {
    return await this._projectRepository.remove(+id);
  }
}
