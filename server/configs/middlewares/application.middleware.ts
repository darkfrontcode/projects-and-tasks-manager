import { Request, Response, NextFunction } from 'express';
import { MESSAGES } from '../data';

export interface IApplicationMiddlewareOutput {
  allowBasics: (req: Request, res: Response, next: NextFunction) => void;
  inversifyExpressServer: (
    err: Error,
    request: Request,
    response: Response,
    next: NextFunction
  ) => void;
}

const allowBasics = (req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

const inversifyExpressServer = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res.status(500).send(MESSAGES.inversifyExpressServerError);
};

export const applicationMiddleware: IApplicationMiddlewareOutput = {
  allowBasics,
  inversifyExpressServer,
};
