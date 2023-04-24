import {
  ApiModel,
  ApiModelProperty,
  SwaggerDefinitionConstant,
} from "swagger-express-ts";

@ApiModel({
  name: "CreateTaskRequest",
  description: "A request wrapper to create a Task",
})
export class CreateTaskRequest {
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
  date: Date;
}
