import "reflect-metadata";

import { inject, injectable } from "inversify";
import { IdentityQuery } from "../../shared";
import { IDeleteProjectByIdUseCase, IProjectRepository } from "../protocols";
import { ProjectRepository } from "../repositories";

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
