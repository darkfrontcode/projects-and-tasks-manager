import { object, string } from "yup";
import { IdentityQuery } from "../../../../interfaces";
import { EditProjectRequest } from "../../../../models";
import { Validator } from "../../validator";

export class EditProjectByIdValidator extends Validator<
  IdentityQuery & EditProjectRequest
> {
  schema = object({
    id: string().required(),
    name: string().required(),
  });
}
