import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { SwaggerDefinitionConstant } from "swagger-express-ts";

const getById = {
  description: "Get a task by id",
  responses: {
    200: {
      description: getReasonPhrase(StatusCodes.OK),
      type: SwaggerDefinitionConstant.Response.Type.OBJECT,
      model: "TaskResponse",
    },
    400: {
      description: getReasonPhrase(StatusCodes.BAD_REQUEST),
      type: SwaggerDefinitionConstant.Response.Type.STRING,
    },
    404: {
      description: getReasonPhrase(StatusCodes.NOT_FOUND),
      type: SwaggerDefinitionConstant.Response.Type.STRING,
    },
  },
  path: "/:id",
  parameters: {
    query: {
      id: {
        description: "Task id",
        required: true,
        type: SwaggerDefinitionConstant.Response.Type.STRING,
      },
    },
  },
};

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
  getById,
};
