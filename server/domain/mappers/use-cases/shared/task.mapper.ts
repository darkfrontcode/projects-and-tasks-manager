import { Task } from "../../../entities";
import { TaskResponse } from "../../../models";

export class TaskMapper {
  private constructor() {}

  static toResponse(tasks: Task[]): TaskResponse[] {
    return tasks.map((task) => {
      const response = new TaskResponse();

      response.projectId = task.projectId;
      response.id = task.id;
      response.name = task.name;
      response.state = task.state;
      response.manager = task.manager;
      response.date = task.date;

      return response;
    });
  }
}
