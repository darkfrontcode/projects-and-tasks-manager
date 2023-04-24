import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { SwaggerDefinitionConstant } from "swagger-express-ts";

const editById = {
  description: "Edit a task",
  responses: {
    200: {
      description: getReasonPhrase(StatusCodes.OK),
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
    body: {
      description: "A request wrapper to edit a Task",
      model: "EditTaskRequest",
      required: true,
    },
  },
};

const deleteById = {
  description: "Delete task by id",
  responses: {
    202: {
      description: getReasonPhrase(StatusCodes.ACCEPTED),
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

const create = {
  description: "Create a task",
  responses: {
    201: {
      description: getReasonPhrase(StatusCodes.CREATED),
    },
    400: {
      description: getReasonPhrase(StatusCodes.BAD_REQUEST),
      type: SwaggerDefinitionConstant.Response.Type.STRING,
    },
  },
  parameters: {
    body: {
      description: "A request wrapper to create a Task",
      model: "CreateTaskRequest",
      required: true,
    },
  },
};

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
  create,
  deleteById,
  editById,
};
