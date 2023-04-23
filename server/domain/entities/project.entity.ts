import { Identity } from "../interfaces";
import { Task } from "./task.entity";

export class Project implements Identity<number> {
  constructor(
    private _id: number,
    private _name: string,
    private _tasks: Array<Task> = new Array<Task>()
  ) {}

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get tasks(): Array<Task> {
    return this._tasks;
  }

  addTask(task: Task) {
    this._tasks.push(task);
  }

  removeTask(id: number) {
    const remove = (task: Task) => task.id !== id;
    this._tasks = this._tasks.filter(remove);
  }

  hasTasks(): boolean {
    return this._tasks.length > 0;
  }
}

export type PartialProject = Identity<number> & Partial<Omit<Project, "id">>;
