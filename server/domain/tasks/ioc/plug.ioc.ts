import { Container } from "inversify";
import { IOCPlug } from "../../../application";
import {
  IAttachTaskToProjectUseCase,
  IChangeTaskStateUseCase,
  ICreateTaskUseCase,
  IDeleteTaskByIdUseCase,
  IEditTaskByIdUseCase,
  IGetTaskByIdUseCase,
  IListTasksUseCase,
  ITaskRepository,
} from "../protocols";
import { TaskRepository } from "../repositories";
import {
  AttachTaskToProject,
  CreateTask,
  DeleteTaskById,
  EditTaskById,
  GetTaskById,
  ListTasks,
} from "../use-cases";
import { ChangeTaskState } from "../use-cases/change-state.case";

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

    container
      .bind<IEditTaskByIdUseCase>(EditTaskById.name)
      .to(EditTaskById)
      .inRequestScope();

    container
      .bind<IChangeTaskStateUseCase>(ChangeTaskState.name)
      .to(ChangeTaskState)
      .inRequestScope();

    container
      .bind<IAttachTaskToProjectUseCase>(AttachTaskToProject.name)
      .to(AttachTaskToProject)
      .inRequestScope();
  }
}
