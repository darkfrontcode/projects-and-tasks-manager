import { TaskMapper } from "../../tasks";
import { Project } from "../entities";
import { ProjectResponse } from "../models";

export class ProjectMapper {
  private constructor() {}

  static toListResponse(projects: Project[]): ProjectResponse[] {
    return projects.map((project) => this.toResponse(project));
  }

  static toResponse(project: Project): ProjectResponse {
    const response = new ProjectResponse();

    response.id = project.id;
    response.name = project.name;

    if (project.hasTasks()) {
      const tasks = TaskMapper.toResponse(project.tasks);
      response.tasks = tasks;
    }

    return response;
  }
}
