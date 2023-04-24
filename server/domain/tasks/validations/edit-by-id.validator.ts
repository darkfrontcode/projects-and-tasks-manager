import { date, object, string } from "yup";
import { IdentityQuery, Validator } from "../../shared";
import { EditTaskRequest } from "../models";

export class EditTaskByIdValidator extends Validator<
  IdentityQuery & EditTaskRequest
> {
  schema = object({
    id: string().required(),
    name: string().required(),
    manager: string().required(),
    date: date().required(),
  });
}
