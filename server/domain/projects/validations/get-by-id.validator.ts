import { object, string } from "yup";
import { IdentityQuery, Validator } from "../../shared";

export class GetProjectByIdValidator extends Validator<IdentityQuery> {
  schema = object({
    id: string().required(),
  });
}
