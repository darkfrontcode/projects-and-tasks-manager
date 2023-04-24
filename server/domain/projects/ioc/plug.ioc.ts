import { Container } from "inversify";
import { IOCPlug } from "../../../application";
import {
  ICreateProjectUseCase,
  IDeleteProjectByIdUseCase,
  IEditProjectByIdUseCase,
  IGetProjectByIdUseCase,
  IListProjectUseCase,
  IProjectRepository,
} from "../protocols";
import { ProjectRepository } from "../repositories";
import {
  CreateProject,
  DeleteProjectById,
  EditProjectById,
  GetProjectById,
  ListProject,
} from "../use-cases";

export class ProjectPlugIOC implements IOCPlug {
  plug(container: Container) {
    /* ==========================================================================
      -- Repositories
    ========================================================================== */

    container
      .bind<IProjectRepository>(ProjectRepository.name)
      .to(ProjectRepository)
      .inSingletonScope();

    /* ==========================================================================
      -- Use cases
    ========================================================================== */

    container
      .bind<IListProjectUseCase>(ListProject.name)
      .to(ListProject)
      .inRequestScope();

    container
      .bind<IGetProjectByIdUseCase>(GetProjectById.name)
      .to(GetProjectById)
      .inRequestScope();

    container
      .bind<ICreateProjectUseCase>(CreateProject.name)
      .to(CreateProject)
      .inRequestScope();

    container
      .bind<IDeleteProjectByIdUseCase>(DeleteProjectById.name)
      .to(DeleteProjectById)
      .inRequestScope();

    container
      .bind<IEditProjectByIdUseCase>(EditProjectById.name)
      .to(EditProjectById)
      .inRequestScope();
  }
}
