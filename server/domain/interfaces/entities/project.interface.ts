import { ITask } from ".";
import { Identity } from "../shared";

export interface IProject extends Identity<number> {
  name: string;
  tasks: Array<ITask>;
}

export type IPartialProject = Identity<number> & Partial<Omit<IProject, "id">>;