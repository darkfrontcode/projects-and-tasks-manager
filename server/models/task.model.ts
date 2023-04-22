import { ITask } from '../interfaces';

export class Task implements ITask {
  projectId: number;
  id: number;
  name: string;
  manager: string;
  date: Date;
}
