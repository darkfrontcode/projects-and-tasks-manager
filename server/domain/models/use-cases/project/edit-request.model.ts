import {
  ApiModel,
  ApiModelProperty,
  SwaggerDefinitionConstant,
} from "swagger-express-ts";

@ApiModel({
  name: "EditProjectRequest",
  description: "A request wrapper to edit a Project",
})
export class EditProjectRequest {
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
