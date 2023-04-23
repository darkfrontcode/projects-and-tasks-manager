import { TaskState } from "../enums";
import { Identity } from "../interfaces";

export class Task implements Identity<number> {
  constructor(
    private _projectId: number,
    private _id: number,
    private _name: string,
    private _state: TaskState,
    private _manager: string,
    private _date: Date = new Date()
  ) {}

  get projectId(): number {
    return this._projectId;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get state(): TaskState {
    return this._state;
  }

  get manager(): string {
    return this._manager;
  }

  get date(): Date {
    return this._date;
  }

  change(state: TaskState) {
    this._state = state;
  }

  hasProject(): boolean {
    return this._projectId !== 0;
  }

  hasManager(): boolean {
    return this._manager !== String();
  }
}
