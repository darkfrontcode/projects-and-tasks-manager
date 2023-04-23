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

import { Request, RequestByQuery, Response } from "../../application";

import {
  GetProjectById,
  GetProjectByIdValidator,
  IGetProjectByIdUseCase,
  IListProjectUseCase,
  IdentityQuery,
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
    @inject(ListProject.name) private _listProject: IListProjectUseCase,
    @inject(GetProjectById.name) private _getProjectById: IGetProjectByIdUseCase
  ) {}

  @ApiOperationGet({
    description: "List all projects",
    responses: {
      200: {
        description: "OK",
        model: "ProjectResponse",
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
      },
      204: {
        description: "No Content",
      },
      400: {
        description: "Bad Request",
        type: SwaggerDefinitionConstant.Response.Type.STRING,
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
    const response = ProjectMapper.toListResponse(projects);

    const status =
      response.length > 0 ? StatusCodes.OK : StatusCodes.NO_CONTENT;

    res.status(status).json(response);
  }

  @ApiOperationGet({
    description: "Get an project by id",
    responses: {
      200: {
        description: "OK",
        type: SwaggerDefinitionConstant.Response.Type.OBJECT,
        model: "ProjectResponse",
      },
      400: {
        description: "Bad Request",
        type: SwaggerDefinitionConstant.Response.Type.STRING,
      },
    },
    path: "/:id",
    parameters: {
      query: {
        id: {
          description: "Project id",
          required: true,
          type: SwaggerDefinitionConstant.Response.Type.STRING,
        },
      },
    },
  })
  @httpGet("/:id")
  async getById(
    req: RequestByQuery<IdentityQuery>,
    res: Response<ProjectResponse>,
    next: NextFunction
  ): Promise<void> {
    const validator = await new GetProjectByIdValidator().validate(req.query);

    if (validator.valid) {
      const project = await this._getProjectById.execute(validator.data);
      const response = ProjectMapper.toResponse(project);

      res.status(StatusCodes.OK).json(response);
      return;
    }

    res.status(StatusCodes.BAD_REQUEST).send(validator.message);
  }
}
