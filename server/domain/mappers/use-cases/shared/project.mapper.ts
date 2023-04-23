import { Project } from "../../../entities";
import { ProjectResponse } from "../../../models";
import { TaskMapper } from "./task.mapper";

export class ProjectMapper {
  private constructor() {}

  static toResponse(projects: Project[]): ProjectResponse[] {
    return projects.map((project) => {
      const response = new ProjectResponse();

      response.id = project.id;
      response.name = project.name;

      if (project.hasTasks()) {
        const tasks = TaskMapper.toResponse(project.tasks);
        response.tasks = tasks;
      }

      return response;
    });
  }
}
