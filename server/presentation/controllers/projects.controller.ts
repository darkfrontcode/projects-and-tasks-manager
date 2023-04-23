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
  CreateProjectRequest,
  CreateProjectValidator,
  DeleteProjectById,
  DeleteProjectByIdValidator,
  EditProjectById,
  EditProjectByIdValidator,
  EditProjectRequest,
  GetProjectById,
  GetProjectByIdValidator,
  ICreateProjectUseCase,
  IDeleteProjectByIdUseCase,
  IEditProjectByIdUseCase,
  IGetProjectByIdUseCase,
  IListProjectUseCase,
  IdentityQuery,
  ListProject,
  ProjectMapper,
  ProjectResponse,
} from "../../domain";
import { CreateProject } from "../../domain/use-cases/project/create.case";
import { projectDOC } from "./documentation";

@ApiPath({
  name: "Projects",
  path: "/projects",
})
@controller("/projects")
@injectable()
export class ProjectsController {
  constructor(
    @inject(ListProject.name) private _listProject: IListProjectUseCase,
    @inject(GetProjectById.name)
    private _getProjectById: IGetProjectByIdUseCase,
    @inject(CreateProject.name) private _createProject: ICreateProjectUseCase,
    @inject(DeleteProjectById.name)
    private _deleteProjectById: IDeleteProjectByIdUseCase,
    @inject(EditProjectById.name)
    private _editProjectById: IEditProjectByIdUseCase
  ) {}

  @ApiOperationGet(projectDOC.list)
  @httpGet("/")
  async list(
    req: RequestByBody<null>,
    res: Response<Array<ProjectResponse>>,
    next: NextFunction
  ): Promise<void> {
    const projects = await this._listProject.execute();
    const response = ProjectMapper.toListResponse(projects);

    if (response.length > 0) {
      res.status(StatusCodes.OK).json(response);
      return;
    }

    res
      .status(StatusCodes.NO_CONTENT)
      .send(getReasonPhrase(StatusCodes.NO_CONTENT));
  }

  @ApiOperationGet(projectDOC.getById)
  @httpGet("/:id")
  async getById(
    req: RequestByQuery<IdentityQuery>,
    res: Response<ProjectResponse>,
    next: NextFunction
  ): Promise<void> {
    const validator = await new GetProjectByIdValidator().validate(req.query);

    if (validator.valid) {
      const project = await this._getProjectById.execute(validator.data);

      if (project) {
        const response = ProjectMapper.toResponse(project);
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

  @ApiOperationPost(projectDOC.create)
  @httpPost("/")
  async create(
    req: RequestByBody<CreateProjectRequest>,
    res: Response<null>,
    next: NextFunction
  ): Promise<void> {
    const validator = await new CreateProjectValidator().validate(req.body);

    if (validator.valid) {
      await this._createProject.execute(validator.data);

      res
        .status(StatusCodes.CREATED)
        .send(getReasonPhrase(StatusCodes.CREATED));

      return;
    }

    res.status(StatusCodes.BAD_REQUEST).send(validator.message);
  }

  @ApiOperationDelete(projectDOC.deleteById)
  @httpDelete("/:id")
  async deleteById(
    req: RequestByQuery<IdentityQuery>,
    res: Response<null>,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.query;
    const validator = await new DeleteProjectByIdValidator().validate({ id });

    if (validator.valid) {
      const success = await this._deleteProjectById.execute(validator.data);

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

  @ApiOperationPut(projectDOC.editById)
  @httpPut("/:id")
  async editById(
    req: Request<IdentityQuery, EditProjectRequest>,
    res: Response<null>,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.query;
    const { name } = req.body;

    const validator = await new EditProjectByIdValidator().validate({
      id,
      name,
    });

    if (validator.valid) {
      const success = await this._editProjectById.execute(validator.data);

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
