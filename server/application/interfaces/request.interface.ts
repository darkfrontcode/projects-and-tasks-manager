import { Request as ExpressRequest } from "express";
import { Query } from "express-serve-static-core";

export interface Request<T> extends ExpressRequest {
  body: T;
}

export interface RequestByQuery<T extends Query> extends ExpressRequest {
  query: T;
}
