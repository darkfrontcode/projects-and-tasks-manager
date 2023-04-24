import "reflect-metadata";

import { inject, injectable } from "inversify";
import { Task } from "../entities";
import { IListTasksUseCase, ITaskRepository } from "../protocols";
import { TaskRepository } from "../repositories";

@injectable()
export class ListTasks implements IListTasksUseCase {
  constructor(
    @inject(TaskRepository.name) private _taskRepository: ITaskRepository
  ) {}

  async execute(): Promise<Task[]> {
    return await this._taskRepository.list();
  }
}
