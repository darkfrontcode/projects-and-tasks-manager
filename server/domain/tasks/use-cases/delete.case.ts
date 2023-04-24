import "reflect-metadata";

import { inject, injectable } from "inversify";
import { IdentityQuery } from "../../shared";
import { IDeleteTaskByIdUseCase, ITaskRepository } from "../protocols";
import { TaskRepository } from "../repositories";

@injectable()
export class DeleteTaskById implements IDeleteTaskByIdUseCase {
  constructor(
    @inject(TaskRepository.name)
    private _taskRepository: ITaskRepository
  ) {}

  async execute({ id }: IdentityQuery): Promise<boolean> {
    return await this._taskRepository.remove(+id);
  }
}
