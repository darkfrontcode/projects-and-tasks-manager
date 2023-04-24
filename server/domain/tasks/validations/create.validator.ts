import { date, object, string } from "yup";
import { Validator } from "../../shared";
import { CreateTaskRequest } from "../models";

export class CreateTaskValidator extends Validator<CreateTaskRequest> {
  schema = object({
    name: string().required(),
    manager: string().required(),
    date: date().required(),
  });
}
