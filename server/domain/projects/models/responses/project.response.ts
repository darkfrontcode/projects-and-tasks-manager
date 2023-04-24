import {
  ApiModel,
  ApiModelProperty,
  SwaggerDefinitionConstant,
} from "swagger-express-ts";
import { TaskResponse } from "../../../tasks";

@ApiModel({
  name: "ProjectResponse",
  description: "A response wrapper to Project Entity",
})
export class ProjectResponse {
  @ApiModelProperty({
    description: "Id of the project",
    example: ["1", "2", "3"],
    type: SwaggerDefinitionConstant.NUMBER,
    required: false,
  })
  id: number;

  @ApiModelProperty({
    description: "The name of your project",
    type: SwaggerDefinitionConstant.STRING,
    example: [
      "Street Fighter",
      "Need For Speed: The Run",
      "Castlevania Dracula X (SNES)",
    ],
    required: true,
  })
  name: string;

  @ApiModelProperty({
    description: "A list of all tasks related to the project",
    type: SwaggerDefinitionConstant.ARRAY,
    model: "TaskResponse",
    required: false,
  })
  tasks: Array<TaskResponse>;
}
