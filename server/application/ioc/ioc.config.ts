import { Container } from "inversify";
import { interfaces, TYPE } from "inversify-express-utils";

import {
  IListProjectUseCase,
  IProjectRepository,
  ListProject,
  ProjectRepository,
} from "../../domain";
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
