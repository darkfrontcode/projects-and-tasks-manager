import { Container } from "inversify";
import { interfaces, TYPE } from "inversify-express-utils";

import { ProjectPlugIOC, TaskPlugIOC } from "../../domain";
import { ProjectsController, TasksController } from "../../presentation";

export module IOC {
  export const container = new Container();

  export function configureContainer(): Container {
    const project = new ProjectPlugIOC();
    const task = new TaskPlugIOC();

    /* ==========================================================================
      -- Domain Plugs
    ========================================================================== */

    project.plug(container);
    task.plug(container);

    /* ==========================================================================
      -- Controllers
    ========================================================================== */

    container
      .bind<interfaces.Controller>(TYPE.Controller)
      .to(ProjectsController)
      .whenTargetNamed(ProjectsController.name);

    container
      .bind<interfaces.Controller>(TYPE.Controller)
      .to(TasksController)
      .whenTargetNamed(TasksController.name);

    return container;
  }
}
