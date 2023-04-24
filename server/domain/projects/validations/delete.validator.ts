import { object, string } from "yup";
import { IdentityQuery, Validator } from "../../shared";

export class DeleteProjectByIdValidator extends Validator<IdentityQuery> {
  schema = object({
    id: string().required(),
  });
}
