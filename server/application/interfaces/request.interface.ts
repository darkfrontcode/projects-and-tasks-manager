import { Request as ExpressRequest } from "express";
import { Query } from "express-serve-static-core";

export interface RequestByBody<TBody> extends ExpressRequest {
  body: TBody;
}

export interface RequestByQuery<TQuery extends Query> extends ExpressRequest {
  query: TQuery;
}

export interface Request<TQuery extends Query, TBody> extends ExpressRequest {
  query: TQuery;
  body: TBody;
}
