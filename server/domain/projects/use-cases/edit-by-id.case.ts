import "reflect-metadata";

import { inject, injectable } from "inversify";
import { IdentityQuery } from "../../shared";
import { EditProjectRequest } from "../models";
import { IEditProjectByIdUseCase, IProjectRepository } from "../protocols";
import { ProjectRepository } from "../repositories";

@injectable()
export class EditProjectById implements IEditProjectByIdUseCase {
  constructor(
    @inject(ProjectRepository.name)
    private _projectRepository: IProjectRepository
  ) {}

  async execute({
    id: stringId,
    name,
  }: IdentityQuery & EditProjectRequest): Promise<boolean> {
    const id = Number(stringId);
    return await this._projectRepository.edit({ id, name });
  }
}
