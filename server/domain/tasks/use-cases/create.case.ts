import "reflect-metadata";

import { inject, injectable } from "inversify";
import { CreateTaskRequest } from "../models";
import { ICreateTaskUseCase, ITaskRepository } from "../protocols";
import { TaskRepository } from "../repositories";

@injectable()
export class CreateTask implements ICreateTaskUseCase {
  constructor(
    @inject(TaskRepository.name)
    private _taskRepository: ITaskRepository
  ) {}

  async execute({ name, manager, date }: CreateTaskRequest): Promise<void> {
    await this._taskRepository.create(name, manager, date);
  }
}
