import "reflect-metadata";

import { inject, injectable } from "inversify";

import {
  IDeleteProjectByIdUseCase,
  IProjectRepository,
  Identity,
  IdentityQuery,
} from "../../interfaces";
import { ProjectRepository } from "../../repositories";

@injectable()
export class DeleteProjectById implements IDeleteProjectByIdUseCase {
  constructor(
    @inject(ProjectRepository.name)
    private _projectRepository: IProjectRepository
  ) {}

  async execute(ids: IdentityQuery[]): Promise<void> {
    const toNumberList = ({ id }: IdentityQuery) => ({
      id: Number(id),
    });

    const list = ids.map<Identity<number>>(toNumberList);

    await this._projectRepository.remove(list);
  }
}
