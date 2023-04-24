import { object, string } from "yup";
import { IdentityQuery, Validator } from "../../shared";

export class DeleteTaskByIdValidator extends Validator<IdentityQuery> {
  schema = object({
    id: string().required(),
  });
}
