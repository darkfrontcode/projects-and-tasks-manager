import {
  ApiModel,
  ApiModelProperty,
  SwaggerDefinitionConstant,
} from "swagger-express-ts";
import { IdentityQuery } from "../../../interfaces";

@ApiModel({
  name: "DeleteProjectRequest",
  description: "A request wrapper to delete a Project",
})
export class DeleteProjectRequest {
  @ApiModelProperty({
    description: "A list of all project IDs to be deleted",
    type: SwaggerDefinitionConstant.ARRAY,
    example: ["1", "2", "3"],
    required: true,
  })
  ids: IdentityQuery[];
}
