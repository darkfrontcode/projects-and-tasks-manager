import {
  ApiModel,
  ApiModelProperty,
  SwaggerDefinitionConstant,
} from "swagger-express-ts";

@ApiModel({
  name: "AttachTaskToProjectRequest",
  description: "Attach a task to a project",
})
export class AttachTaskToProjectRequest {
  @ApiModelProperty({
    description: "Project id to attach the task",
    type: SwaggerDefinitionConstant.NUMBER,
    required: true,
  })
  projectId: string;
}
