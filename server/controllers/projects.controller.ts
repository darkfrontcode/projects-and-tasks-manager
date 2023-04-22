import 'reflect-metadata';

import { Request, Response, NextFunction } from 'express';
import { controller, httpGet } from 'inversify-express-utils';
import { inject, injectable } from 'inversify';
import {
  ApiOperationGet,
  ApiPath,
  SwaggerDefinitionConstant,
} from 'swagger-express-ts';

import { IOCTYPES } from '../ioc';
import { IProjectService } from '../interfaces';

@ApiPath({
  name: 'Projects',
  path: '/projects',
})
@controller('/projects')
@injectable()
export class ProjectsController {
  static url = '/projects';

  constructor(
    @inject(IOCTYPES.PROJECT_SERVICE)
    private _projectService: IProjectService
  ) {}

  @ApiOperationGet({
    description: 'List all projects',
    responses: {
      200: {
        model: 'Project',
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
      },
      204: {},
    },
  })
  @httpGet('/')
  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    const list = await this._projectService.list();
    const status = list.length > 0 ? 200 : 204;

    res.status(status).json(list);
  }
}
