import {
  ApiModel,
  ApiModelProperty,
  SwaggerDefinitionConstant,
} from "swagger-express-ts";

@ApiModel({
  name: "CreateProjectRequest",
  description: "A request wrapper to create a Project",
})
export class CreateProjectRequest {
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
}
