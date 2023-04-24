import "reflect-metadata";

import { inject, injectable } from "inversify";
import { IdentityQuery } from "../../shared";
import { Task } from "../entities";
import { IGetTaskByIdUseCase, ITaskRepository } from "../protocols";
import { TaskRepository } from "../repositories";

@injectable()
export class GetTaskById implements IGetTaskByIdUseCase {
  constructor(
    @inject(TaskRepository.name)
    private _taskRepository: ITaskRepository
  ) {}

  async execute({ id }: IdentityQuery): Promise<Task> {
    return await this._taskRepository.find(+id);
  }
}
