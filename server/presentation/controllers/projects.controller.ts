import "reflect-metadata";

import { NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";
import { controller, httpGet } from "inversify-express-utils";
import {
  ApiOperationGet,
  ApiPath,
  SwaggerDefinitionConstant,
} from "swagger-express-ts";

import { Request, Response } from "../../application";

import {
  IListProjectUseCase,
  ListProject,
  ProjectMapper,
  ProjectResponse,
} from "../../domain";

@ApiPath({
  name: "Projects",
  path: "/projects",
})
@controller("/projects")
@injectable()
export class ProjectsController {
  constructor(
    @inject(ListProject.name)
    private _listProject: IListProjectUseCase
  ) {}

  @ApiOperationGet({
    description: "List all projects",
    responses: {
      200: {
        model: "ProjectResponse",
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
      },
    },
  })
  @httpGet("/")
  async list(
    req: Request<null>,
    res: Response<Array<ProjectResponse>>,
    next: NextFunction
  ): Promise<void> {
    const projects = await this._listProject.execute();
    const response = ProjectMapper.toResponse(projects);

    res.status(StatusCodes.OK).json(response);
  }
}
