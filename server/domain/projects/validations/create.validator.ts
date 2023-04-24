import { object, string } from "yup";
import { Validator } from "../../shared";
import { CreateProjectRequest } from "../models";

export class CreateProjectValidator extends Validator<CreateProjectRequest> {
  schema = object({
    name: string().required(),
  });
}
