import "reflect-metadata";

import { inject, injectable } from "inversify";
import { IdentityQuery } from "../../shared";
import { EditTaskRequest } from "../models";
import { IEditTaskByIdUseCase, ITaskRepository } from "../protocols";
import { TaskRepository } from "../repositories";

@injectable()
export class EditTaskById implements IEditTaskByIdUseCase {
  constructor(
    @inject(TaskRepository.name)
    private _taskRepository: ITaskRepository
  ) {}

  async execute({
    id: stringId,
    name,
    manager,
    date: stringDate,
  }: IdentityQuery & EditTaskRequest): Promise<boolean> {
    const id = Number(stringId);
    const date = new Date(stringDate);

    return await this._taskRepository.edit({ id, name, manager, date });
  }
}
