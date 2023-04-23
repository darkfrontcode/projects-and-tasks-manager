import { object, string } from "yup";
import { CreateProjectRequest } from "../../../../models";
import { Validator } from "../../validator";

export class CreateProjectValidator extends Validator<CreateProjectRequest> {
  schema = object({
    name: string().required(),
  });
}
