import "reflect-metadata";

import { NextFunction } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { inject, injectable } from "inversify";
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
} from "inversify-express-utils";
import {
  ApiOperationDelete,
  ApiOperationGet,
  ApiOperationPost,
  ApiOperationPut,
  ApiPath,
} from "swagger-express-ts";

import {
  Request,
  RequestByBody,
  RequestByQuery,
  Response,
} from "../../application";

import {
  AttachTaskToProject,
  AttachTaskToProjectRequest,
  AttachTaskToProjectValidator,
  ChangeTaskStateRequest,
  ChangeTaskStateValidator,
  CreateTask,
  CreateTaskRequest,
  CreateTaskValidator,
  DeleteTaskById,
  DeleteTaskByIdValidator,
  EditTaskById,
  EditTaskByIdValidator,
  EditTaskRequest,
  GetTaskById,
  GetTaskByIdValidator,
  IAttachTaskToProjectUseCase,
  IChangeTaskStateUseCase,
  ICreateTaskUseCase,
  IDeleteTaskByIdUseCase,
  IEditTaskByIdUseCase,
  IGetTaskByIdUseCase,
  IListTasksUseCase,
  IdentityQuery,
  ListTasks,
  TaskMapper,
  TaskResponse,
} from "../../domain";
import { ChangeTaskState } from "../../domain/tasks/use-cases/change-state.case";
import { taskDOC } from "./documentation";

@ApiPath({
  name: "Tasks",
  path: "/tasks",
})
@controller("/tasks")
@injectable()
export class TasksController {
  // prettier-ignore
  constructor(
    @inject(ListTasks.name) private _listTasks: IListTasksUseCase,
    @inject(GetTaskById.name) private _getTaskById: IGetTaskByIdUseCase,
    @inject(CreateTask.name) private _createTask: ICreateTaskUseCase,
    @inject(DeleteTaskById.name) private _deleteTaskById: IDeleteTaskByIdUseCase,
    @inject(EditTaskById.name) private _editTaskById: IEditTaskByIdUseCase,
    @inject(ChangeTaskState.name) private _changeTaskState: IChangeTaskStateUseCase,
    @inject(AttachTaskToProject.name) private _attachTaskToProject: IAttachTaskToProjectUseCase
  ) {}

  @ApiOperationGet(taskDOC.list)
  @httpGet("/")
  async list(
    req: RequestByBody<null>,
    res: Response<Array<TaskResponse>>,
    next: NextFunction
  ): Promise<void> {
    const tasks = await this._listTasks.execute();
    const response = TaskMapper.toListResponse(tasks);

    if (response.length > 0) {
      res.status(StatusCodes.OK).json(response);
      return;
    }

    res
      .status(StatusCodes.NO_CONTENT)
      .send(getReasonPhrase(StatusCodes.NO_CONTENT));
  }

  @ApiOperationGet(taskDOC.getById)
  @httpGet("/:id")
  async getById(
    req: RequestByQuery<IdentityQuery>,
    res: Response<TaskResponse>,
    next: NextFunction
  ): Promise<void> {
    const validator = await new GetTaskByIdValidator().validate(req.query);

    if (validator.valid) {
      const task = await this._getTaskById.execute(validator.data);

      if (task) {
        const response = TaskMapper.toResponse(task);
        res.status(StatusCodes.OK).json(response);

        return;
      }

      res
        .status(StatusCodes.NOT_FOUND)
        .send(getReasonPhrase(StatusCodes.NOT_FOUND));

      return;
    }

    res.status(StatusCodes.BAD_REQUEST).send(validator.message);
  }

  @ApiOperationPost(taskDOC.create)
  @httpPost("/")
  async create(
    req: RequestByBody<CreateTaskRequest>,
    res: Response<null>,
    next: NextFunction
  ): Promise<void> {
    const validator = await new CreateTaskValidator().validate(req.body);

    if (validator.valid) {
      await this._createTask.execute(validator.data);

      res
        .status(StatusCodes.CREATED)
        .send(getReasonPhrase(StatusCodes.CREATED));

      return;
    }

    res.status(StatusCodes.BAD_REQUEST).send(validator.message);
  }

  @ApiOperationDelete(taskDOC.deleteById)
  @httpDelete("/:id")
  async deleteById(
    req: RequestByQuery<IdentityQuery>,
    res: Response<null>,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.query;
    const validator = await new DeleteTaskByIdValidator().validate({ id });

    if (validator.valid) {
      const success = await this._deleteTaskById.execute(validator.data);

      if (success) {
        res
          .status(StatusCodes.ACCEPTED)
          .send(getReasonPhrase(StatusCodes.ACCEPTED));

        return;
      }

      res
        .status(StatusCodes.NOT_FOUND)
        .send(getReasonPhrase(StatusCodes.NOT_FOUND));
    }

    res.status(StatusCodes.BAD_REQUEST).send(validator.message);
  }

  @ApiOperationPut(taskDOC.editById)
  @httpPut("/:id")
  async editById(
    req: Request<IdentityQuery, EditTaskRequest>,
    res: Response<null>,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.query;
    const { name, manager, date } = req.body;

    const validator = await new EditTaskByIdValidator().validate({
      id,
      name,
      manager,
      date,
    });

    if (validator.valid) {
      const success = await this._editTaskById.execute(validator.data);

      if (success) {
        res.status(StatusCodes.OK).send(getReasonPhrase(StatusCodes.OK));
        return;
      }

      res
        .status(StatusCodes.NOT_FOUND)
        .send(getReasonPhrase(StatusCodes.NOT_FOUND));

      return;
    }

    res.status(StatusCodes.BAD_REQUEST).send(validator.message);
  }

  @ApiOperationPost(taskDOC.changeState)
  @httpPost("/:id/change-state")
  async changeState(
    req: Request<IdentityQuery, ChangeTaskStateRequest>,
    res: Response<null>,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.query;
    const { state } = req.body;

    const validator = await new ChangeTaskStateValidator().validate({
      id,
      state,
    });

    if (validator.valid) {
      const success = await this._changeTaskState.execute(validator.data);

      if (success) {
        res.status(StatusCodes.OK).send(getReasonPhrase(StatusCodes.OK));
        return;
      }

      res
        .status(StatusCodes.NOT_FOUND)
        .send(getReasonPhrase(StatusCodes.NOT_FOUND));

      return;
    }

    res.status(StatusCodes.BAD_REQUEST).send(validator.message);
  }

  @ApiOperationPost(taskDOC.attachToProject)
  @httpPost("/:id/attach-to-project")
  async attachToProject(
    req: Request<IdentityQuery, AttachTaskToProjectRequest>,
    res: Response<null>,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.query;
    const { projectId } = req.body;

    const validator = await new AttachTaskToProjectValidator().validate({
      id,
      projectId,
    });

    if (validator.valid) {
      const success = await this._attachTaskToProject.execute(validator.data);

      if (success) {
        res.status(StatusCodes.OK).send(getReasonPhrase(StatusCodes.OK));
        return;
      }

      res
        .status(StatusCodes.NOT_FOUND)
        .send(getReasonPhrase(StatusCodes.NOT_FOUND));

      return;
    }

    res.status(StatusCodes.BAD_REQUEST).send(validator.message);
  }
}
