import {
  ApiModel,
  ApiModelProperty,
  SwaggerDefinitionConstant,
} from "swagger-express-ts";
import { TaskState } from "../../enums";

@ApiModel({
  name: "TaskResponse",
  description: "A response wrapper to Task Entity",
})
export class TaskResponse {
  @ApiModelProperty({
    description: "Id of some project that task can be attached",
    example: ["1", "2", "3"],
    type: SwaggerDefinitionConstant.NUMBER,
    required: false,
  })
  projectId: number;

  @ApiModelProperty({
    description: "Id of the task",
    example: ["1", "2", "3"],
    type: SwaggerDefinitionConstant.NUMBER,
    required: false,
  })
  id: number;

  @ApiModelProperty({
    description: "The name of the task",
    example: ["Play", "Sleep", "Repeat"],
    type: SwaggerDefinitionConstant.STRING,
    required: true,
  })
  name: string;

  @ApiModelProperty({
    description: "The state of the task",
    example: [TaskState.TODO, TaskState.DOING, TaskState.DONE],
    enum: [TaskState.TODO, TaskState.DOING, TaskState.DONE],
    type: SwaggerDefinitionConstant.STRING,
    required: false,
  })
  state: string;

  @ApiModelProperty({
    description: "Name of someone in charge",
    example: ["Jhon", "Jane", "Jack"],
    type: SwaggerDefinitionConstant.STRING,
    required: true,
  })
  manager: string;

  @ApiModelProperty({
    description: "Due Date",
    type: SwaggerDefinitionConstant.STRING,
    example: [new Date()],
    required: true,
  })
  date: Date;
}
