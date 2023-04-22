import { Container } from 'inversify';
import { IOCTYPES } from './ioc-types.enum';
import { ProjectService } from '../services';
import { ProjectsController } from '../controllers';
import { IProjectRepository, IProjectService } from '../interfaces';
import { ProjectRepository } from '../repositories';
import { interfaces, TYPE } from 'inversify-express-utils';

export module IOC {
  export const container = new Container();

  export function configureContainer(): Container {
    /* ==========================================================================
      -- Controllers
    ========================================================================== */

    container
      .bind<interfaces.Controller>(TYPE.Controller)
      .to(ProjectsController)
      .whenTargetNamed(ProjectsController.name);

    /* ==========================================================================
      -- Services
    ========================================================================== */

    container
      .bind<IProjectService>(IOCTYPES.PROJECT_SERVICE)
      .to(ProjectService)
      .inSingletonScope();

    /* ==========================================================================
      -- Repositories
    ========================================================================== */

    container
      .bind<IProjectRepository>(IOCTYPES.PROJECT_REPOSITORY)
      .to(ProjectRepository)
      .inSingletonScope();

    return container;
  }
}
