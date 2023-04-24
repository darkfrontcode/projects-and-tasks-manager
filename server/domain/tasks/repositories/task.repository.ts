import "reflect-metadata";

import { injectable } from "inversify";

import { PartialTask, Task } from "../entities";
import { TaskState } from "../enums";
import { ITaskRepository } from "../protocols";

@injectable()
export class TaskRepository implements ITaskRepository {
  private _task: Task[] = new Array<Task>();

  private _autoIncrementId(): number {
    if (this._task.length > 0) {
      const toMax = (prev: Task, next: Task) =>
        prev.id > next.id ? prev : next;
      const { id } = this._task.reduce(toMax);

      return id + 1;
    }

    return 1;
  }

  async list(): Promise<Array<Task>> {
    return await new Promise<Array<Task>>((resolve, reject) => {
      try {
        resolve(this._task);
      } catch (err) {
        resolve(new Array<Task>());
      }
    });
  }

  async find(id: number): Promise<Task> {
    return await new Promise<Task>((resolve, reject) => {
      try {
        const comparer = (task: Task) => task.id === id;
        const task = this._task.find(comparer);

        resolve(task);
      } catch (err) {
        resolve(undefined);
      }
    });
  }

  async create(
    projectId: number,
    name: string,
    state: TaskState,
    manager: string,
    date: Date
  ): Promise<boolean> {
    return await new Promise<boolean>((resolve, reject) => {
      try {
        const id = this._autoIncrementId();
        const task = new Task(projectId, id, name, state, manager, date);

        this._task.push(task);
        resolve(true);
      } catch (err) {
        resolve(false);
      }
    });
  }

  async remove(id: number): Promise<boolean> {
    return await new Promise<boolean>(async (resolve, reject) => {
      try {
        const valid = await this.find(id);

        if (valid) {
          const comparer = (task: Task) => task.id !== id;
          this._task = this._task.filter(comparer);
          resolve(true);
        }

        resolve(false);
      } catch (err) {
        resolve(false);
      }
    });
  }

  async edit(partial: PartialTask): Promise<boolean> {
    return await new Promise<boolean>(async (resolve, reject) => {
      try {
        const valid = await this.find(partial.id);

        if (valid) {
          const merge = (task: Task) => {
            if (task.id === partial.id) {
              task.fromPartial = partial;
            }

            return task;
          };

          this._task = this._task.map(merge);
          resolve(true);
        }

        resolve(false);
      } catch (err) {
        resolve(false);
      }
    });
  }
}
