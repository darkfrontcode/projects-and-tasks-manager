import 'reflect-metadata';

import { inject, injectable } from 'inversify';
import { IOCTYPES } from '../ioc';
import {
  Identity,
  IPartialProject,
  IProject,
  IProjectRepository,
  IProjectService,
} from '../interfaces';

@injectable()
export class ProjectService implements IProjectService {
  constructor(
    @inject(IOCTYPES.PROJECT_REPOSITORY)
    private _projectRepository: IProjectRepository
  ) {}

  async list(): Promise<Array<IProject>> {
    return await this._projectRepository.list();
  }

  async add(project: IProject): Promise<boolean> {
    return await this._projectRepository.add(project);
  }

  async remove(ids: Array<Identity<number>>): Promise<boolean> {
    return await this._projectRepository.remove(ids);
  }

  async edit(partial: IPartialProject): Promise<boolean> {
    const project = await this._projectRepository.find(partial.id);

    if (project) {
      return this._projectRepository.edit(partial);
    }

    return false;
  }
}
