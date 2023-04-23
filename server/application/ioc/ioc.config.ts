import { Container } from "inversify";
import { interfaces, TYPE } from "inversify-express-utils";

import {
  DeleteProjectById,
  EditProjectById,
  GetProjectById,
  ICreateProjectUseCase,
  IDeleteProjectByIdUseCase,
  IEditProjectByIdUseCase,
  IGetProjectByIdUseCase,
  IListProjectUseCase,
  IProjectRepository,
  ListProject,
  ProjectRepository,
} from "../../domain";
import { CreateProject } from "../../domain/use-cases/project/create.case";
import { ProjectsController } from "../../presentation";

export module IOC {
  export const container = new Container();

  export function configureContainer(): Container {
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

    /* ==========================================================================
      -- Controllers
    ========================================================================== */

    container
      .bind<interfaces.Controller>(TYPE.Controller)
      .to(ProjectsController)
      .whenTargetNamed(ProjectsController.name);

    return container;
  }
}
