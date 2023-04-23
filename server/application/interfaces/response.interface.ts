import { Send } from "express-serve-static-core";
import { Response as ExpressResponse } from "express";

export interface Response<T> extends ExpressResponse {
  json: Send<T, this>;
}
