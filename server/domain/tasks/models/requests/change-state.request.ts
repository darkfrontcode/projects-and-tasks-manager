import {
  ApiModel,
  ApiModelProperty,
  SwaggerDefinitionConstant,
} from "swagger-express-ts";
import { TaskState } from "../../enums";

@ApiModel({
  name: "ChangeTaskStateRequest",
  description: "Change state from Task",
})
export class ChangeTaskStateRequest {
  @ApiModelProperty({
    description: "New state from the task",
    type: SwaggerDefinitionConstant.STRING,
    enum: [TaskState.TODO, TaskState.DOING, TaskState.DONE],
    required: true,
  })
  state: string;
}
