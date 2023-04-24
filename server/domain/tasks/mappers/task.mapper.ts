import { Task } from "../entities";
import { TaskResponse } from "../models";

export class TaskMapper {
  private constructor() {}

  static toListResponse(tasks: Task[]): TaskResponse[] {
    return tasks.map((task) => this.toResponse(task));
  }

  static toResponse(task: Task): TaskResponse {
    const response = new TaskResponse();

    response.projectId = task.projectId;
    response.id = task.id;
    response.name = task.name;
    response.state = task.state;
    response.manager = task.manager;
    response.date = task.date;

    return response;
  }
}
