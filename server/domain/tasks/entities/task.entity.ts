import { Identity } from "../../shared";
import { TaskState } from "../enums";

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

  set fromPartial(partial: PartialTask) {
    const { projectId, name, state, manager, date } = partial;

    this._projectId = projectId || this._projectId;
    this._name = name || this._name;
    this._state = state || this._state;
    this._manager = manager || this._manager;
    this._date = date || this._date;
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

export type PartialTask = Identity<number> & Partial<Omit<Task, "id">>;
