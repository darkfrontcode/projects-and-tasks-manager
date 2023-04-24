import "reflect-metadata";

import { inject, injectable } from "inversify";
import { IdentityQuery } from "../../shared";
import { TaskState } from "../enums";
import { ChangeTaskStateRequest } from "../models";
import { IChangeTaskStateUseCase, ITaskRepository } from "../protocols";
import { TaskRepository } from "../repositories";

@injectable()
export class ChangeTaskState implements IChangeTaskStateUseCase {
  constructor(
    @inject(TaskRepository.name) private _taskRepository: ITaskRepository
  ) {}

  async execute({
    id: stringId,
    state: stringState,
  }: IdentityQuery & ChangeTaskStateRequest): Promise<boolean> {
    const id = Number(stringId);

    const index = Object.values(TaskState).indexOf(
      stringState as unknown as TaskState
    );
    const key = Object.keys(TaskState)[index] as TaskState;
    const state = TaskState[key];

    return await this._taskRepository.changeState(id, state);
  }
}
