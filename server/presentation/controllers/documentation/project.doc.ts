import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { SwaggerDefinitionConstant } from "swagger-express-ts";

const editById = {
  description: "Edit a project",
  responses: {
    200: {
      description: getReasonPhrase(StatusCodes.OK),
    },
    400: {
      description: getReasonPhrase(StatusCodes.BAD_REQUEST),
      type: SwaggerDefinitionConstant.Response.Type.STRING,
    },
  },
};

const deleteById = {
  description: "Delete a project by id",
  responses: {
    202: {
      description: getReasonPhrase(StatusCodes.ACCEPTED),
    },
    400: {
      description: getReasonPhrase(StatusCodes.BAD_REQUEST),
      type: SwaggerDefinitionConstant.Response.Type.STRING,
    },
  },
  path: "/:id",
  parameters: {
    query: {
      id: {
        description: "Project id",
        required: true,
        type: SwaggerDefinitionConstant.Response.Type.STRING,
      },
    },
  },
};

const create = {
  description: "Create an project",
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
      description: "A request wrapper to create a Project",
      model: "CreateProjectRequest",
      required: true,
    },
  },
};

const getById = {
  description: "Get a project by id",
  responses: {
    200: {
      description: getReasonPhrase(StatusCodes.OK),
      type: SwaggerDefinitionConstant.Response.Type.OBJECT,
      model: "ProjectResponse",
    },
    400: {
      description: getReasonPhrase(StatusCodes.BAD_REQUEST),
      type: SwaggerDefinitionConstant.Response.Type.STRING,
    },
  },
  path: "/:id",
  parameters: {
    query: {
      id: {
        description: "Project id",
        required: true,
        type: SwaggerDefinitionConstant.Response.Type.STRING,
      },
    },
  },
};

const list = {
  description: "List all projects",
  responses: {
    200: {
      description: getReasonPhrase(StatusCodes.OK),
      model: "ProjectResponse",
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

export const projectDOC = {
  editById,
  deleteById,
  create,
  getById,
  list,
};
