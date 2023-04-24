import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { SwaggerDefinitionConstant } from "swagger-express-ts";

const list = {
  description: "List all tasks",
  responses: {
    200: {
      description: getReasonPhrase(StatusCodes.OK),
      model: "TaskResponse",
      type: SwaggerDefinitionConstant.Response.Type.ARRAY,
    },
    204: {
      description: getReasonPhrase(StatusCodes.NO_CONTENT),
    },
    400: {
      description: getReasonPhrase(StatusCodes.BAD_REQUEST),
      type: SwaggerDefinitionConstant.Response.Type.STRING,
    },
  },
};

export const taskDOC = {
  list,
};
