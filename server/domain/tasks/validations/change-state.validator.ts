import { mixed, object, string } from "yup";
import { IdentityQuery, Validator } from "../../shared";
import { TaskState } from "../enums";
import { ChangeTaskStateRequest } from "../models";

export class ChangeTaskStateValidator extends Validator<
  IdentityQuery & ChangeTaskStateRequest
> {
  schema = object({
    id: string().required(),
    state: mixed<TaskState>().oneOf(Object.values(TaskState)).required(),
  });
}
