import "reflect-metadata";

import { NextFunction } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { inject, injectable } from "inversify";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { ApiOperationGet, ApiOperationPost, ApiPath } from "swagger-express-ts";

import { RequestByBody, RequestByQuery, Response } from "../../application";

import {
  CreateTask,
  CreateTaskRequest,
  CreateTaskValidator,
  GetTaskById,
  GetTaskByIdValidator,
  ICreateTaskUseCase,
  IGetTaskByIdUseCase,
  IListTasksUseCase,
  IdentityQuery,
  ListTasks,
  TaskMapper,
  TaskResponse,
} from "../../domain";
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
    @inject(CreateTask.name) private _createTask: ICreateTaskUseCase
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
}
