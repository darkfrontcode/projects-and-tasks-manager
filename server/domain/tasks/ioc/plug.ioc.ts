import { Container } from "inversify";
import { IOCPlug } from "../../../application";
import {
  IGetTaskByIdUseCase,
  IListTasksUseCase,
  ITaskRepository,
} from "../protocols";
import { TaskRepository } from "../repositories";
import { GetTaskById, ListTasks } from "../use-cases";

export class TaskPlugIOC implements IOCPlug {
  plug(container: Container) {
    /* ==========================================================================
      -- Repositories
    ========================================================================== */

    container
      .bind<ITaskRepository>(TaskRepository.name)
      .to(TaskRepository)
      .inSingletonScope();

    /* ==========================================================================
      -- Use cases
    ========================================================================== */

    container
      .bind<IListTasksUseCase>(ListTasks.name)
      .to(ListTasks)
      .inRequestScope();

    container
      .bind<IGetTaskByIdUseCase>(GetTaskById.name)
      .to(GetTaskById)
      .inRequestScope();
  }
}
