import {
  ApiModel,
  ApiModelProperty,
  SwaggerDefinitionConstant,
} from "swagger-express-ts";

@ApiModel({
  name: "EditTaskRequest",
  description: "A request wrapper to edit a Task",
})
export class EditTaskRequest {
  @ApiModelProperty({
    description: "The name of your task",
    type: SwaggerDefinitionConstant.STRING,
    example: ["Dragon Punch", "Drive a car", "Backflip + Moon walking"],
    required: true,
  })
  name: string;

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
  date: string;
}
