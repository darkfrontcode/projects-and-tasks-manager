import * as bodyParser from "body-parser";
import * as express from "express";
import * as swagger from "swagger-express-ts";

import { applicationMiddleware } from "../middlewares";
import { SWAGGER_INFO_OBJECT, SWAGGER_PATH } from "../swagger";

export interface IInversify {
  config: {
    error: (app: express.Express) => void;
    server: (app: express.Express) => void;
  };
}

const server = (app: express.Express) => {
  app.use(applicationMiddleware.allowBasics);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(SWAGGER_PATH.URL, express.static(SWAGGER_PATH.NAME));
  app.use(SWAGGER_PATH.ASSETS, express.static(SWAGGER_PATH.STATIC));
  app.use(swagger.express(SWAGGER_INFO_OBJECT));
  app.get("/", (req, res) => res.redirect(SWAGGER_PATH.URL));
};

const error = (app: express.Express) => {
  app.use(applicationMiddleware.expressServerError);
};

export const inversify: IInversify = {
  config: {
    error,
    server,
  },
};
