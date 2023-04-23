import { Identity } from "../shared";

export interface ITask extends Identity<number> {
  projectId: number;
  name: string;
  manager: string;
  date: Date;
}
