import { Container } from "inversify";
import { IOCPlug } from "../../../application";
import {
  ICreateTaskUseCase,
  IDeleteTaskByIdUseCase,
  IGetTaskByIdUseCase,
  IListTasksUseCase,
  ITaskRepository,
} from "../protocols";
import { TaskRepository } from "../repositories";
import {
  CreateTask,
  DeleteTaskById,
  GetTaskById,
  ListTasks,
} from "../use-cases";

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

    container
      .bind<ICreateTaskUseCase>(CreateTask.name)
      .to(CreateTask)
      .inRequestScope();

    container
      .bind<IDeleteTaskByIdUseCase>(DeleteTaskById.name)
      .to(DeleteTaskById)
      .inRequestScope();
  }
}
