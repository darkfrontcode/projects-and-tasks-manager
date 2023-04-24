import "reflect-metadata";

import { NextFunction } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { inject, injectable } from "inversify";
import { controller, httpGet } from "inversify-express-utils";
import { ApiOperationGet, ApiPath } from "swagger-express-ts";

import { RequestByBody, Response } from "../../application";

import {
  IListTasksUseCase,
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
  constructor(@inject(ListTasks.name) private _listTasks: IListTasksUseCase) {}

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
}
